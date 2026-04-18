import { AntdValidator } from '../src/antd'
import { VantValidator } from '../src/vant'
import defaultRules from '../src/rules'
import zhCN from '../src/locale/zhCN'
import enUS from '../src/locale/enUS'

// ─── helpers ────────────────────────────────────────────────────────────────

function makeAntd(overrides = {}) {
  return new AntdValidator({
    locale: 'zhCN',
    locales: { zhCN, enUS },
    rules: defaultRules,
    ...overrides,
  })
}

function makeVant(overrides = {}) {
  return new VantValidator({
    locale: 'zhCN',
    locales: { zhCN, enUS },
    rules: defaultRules,
    ...overrides,
  })
}

/** 调用 antd 规则的 validator 函数 */
const runAntd = (rule: any, value: any) => rule.validator({}, value)

/** 调用 vant 规则的 validator 函数 */
const runVant = (rule: any, value: any) => rule.validator(value)

// ─── AntdValidator ──────────────────────────────────────────────────────────

describe('AntdValidator', () => {
  describe('schema()', () => {
    test('每个字段生成规则数组', () => {
      const v = makeAntd()
      const rules = v.schema({ phone: { label: '手机号', rules: ['required', 'telephone'] } })
      expect(Array.isArray(rules.phone)).toBe(true)
      expect(rules.phone).toHaveLength(2)
    })

    test('规则顺序与 rules 数组一致', () => {
      const v = makeAntd()
      const rules = v.schema({
        age: {
          label: '年龄',
          rules: [
            { rule: 'min', value: 18 },
            { rule: 'max', value: 60 },
          ],
        },
      })
      expect(rules.age[0].rule).toBe('min')
      expect(rules.age[1].rule).toBe('max')
    })

    test('字符串简写等价于 Boolean 规则', () => {
      const v = makeAntd()
      const rules = v.schema({ phone: { label: '手机号', rules: ['telephone'] } })
      expect(rules.phone).toHaveLength(1)
    })

    test('不存在的规则名跳过并打印警告', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
      const v = makeAntd()
      const rules = v.schema({ x: { rules: ['nonexistent' as any] } })
      expect(rules.x).toHaveLength(0)
      expect(warn).toHaveBeenCalled()
      warn.mockRestore()
    })
  })

  describe('required 规则', () => {
    test('空值时 required 校验失败', async () => {
      const v = makeAntd()
      const [req] = v.schema({ name: { label: '姓名', rules: ['required'] } }).name
      await expect(runAntd(req, '')).rejects.toThrow()
      await expect(runAntd(req, undefined)).rejects.toThrow()
    })

    test('非空值时 required 校验通过', async () => {
      const v = makeAntd()
      const [req] = v.schema({ name: { label: '姓名', rules: ['required'] } }).name
      await expect(runAntd(req, '张三')).resolves.toBeUndefined()
    })
  })

  describe('非 required 字段的空值跳过逻辑', () => {
    test('未设置 required 时空值跳过其他规则', async () => {
      const v = makeAntd()
      const [tel] = v.schema({ phone: { label: '手机号', rules: ['telephone'] } }).phone
      // 空值应直接 resolve，不走 telephone 校验
      await expect(runAntd(tel, '')).resolves.toBeUndefined()
      await expect(runAntd(tel, undefined)).resolves.toBeUndefined()
    })

    test('设置 required 时空值不跳过其他规则', async () => {
      const v = makeAntd()
      const rules = v.schema({
        phone: { label: '手机号', rules: ['required', 'telephone'] },
      })
      const tel = rules.phone[1]
      // required 存在，telephone 对空值也应校验（失败）
      await expect(runAntd(tel, '')).rejects.toThrow()
    })
  })

  describe('规则校验逻辑', () => {
    test('telephone 对合法手机号通过', async () => {
      const v = makeAntd()
      const [tel] = v.schema({ phone: { label: '手机号', rules: ['telephone'] } }).phone
      await expect(runAntd(tel, '13800138000')).resolves.toBeUndefined()
    })

    test('telephone 对非法手机号失败', async () => {
      const v = makeAntd()
      const [tel] = v.schema({ phone: { label: '手机号', rules: ['telephone'] } }).phone
      await expect(runAntd(tel, '123')).rejects.toThrow()
    })

    test('min 规则：值小于下限时失败', async () => {
      const v = makeAntd()
      const [min] = v.schema({ age: { label: '年龄', rules: [{ rule: 'min', value: 18 }] } }).age
      await expect(runAntd(min, 17)).rejects.toThrow()
      await expect(runAntd(min, 18)).resolves.toBeUndefined()
    })

    test('maxlength 规则：超出长度时失败', async () => {
      const v = makeAntd()
      const [ml] = v.schema({ bio: { label: '简介', rules: [{ rule: 'maxlength', value: 10 }] } }).bio
      await expect(runAntd(ml, 'a'.repeat(11))).rejects.toThrow()
      await expect(runAntd(ml, 'a'.repeat(10))).resolves.toBeUndefined()
    })

    test('range 规则：值在范围内通过', async () => {
      const v = makeAntd()
      const [range] = v.schema({ score: { label: '评分', rules: [{ rule: 'range', value: [1, 5] }] } }).score
      await expect(runAntd(range, 3)).resolves.toBeUndefined()
      await expect(runAntd(range, 6)).rejects.toThrow()
    })

    test('array 类型字段 required 对空数组失败', async () => {
      const v = makeAntd()
      const [req] = v.schema({ tags: { type: 'array', label: '标签', rules: ['required'] } }).tags
      await expect(runAntd(req, [])).rejects.toThrow()
      await expect(runAntd(req, [1])).resolves.toBeUndefined()
    })
  })

  describe('错误消息', () => {
    test('消息包含 label', async () => {
      const v = makeAntd()
      const [req] = v.schema({ name: { label: '姓名', rules: ['required'] } }).name
      const err = await runAntd(req, '').catch((e: Error) => e)
      expect(err.message).toContain('姓名')
    })

    test('直接指定 message 优先于 locale', async () => {
      const v = makeAntd()
      const [req] = v.schema({
        name: { label: '姓名', rules: [{ rule: 'required', message: '自定义消息' }] },
      }).name
      const err = await runAntd(req, '').catch((e: Error) => e)
      expect(err.message).toBe('自定义消息')
    })

    test('template 选择 locale 的对应键', async () => {
      const v = makeAntd()
      const [req] = v.schema({
        sex: { label: '性别', rules: [{ rule: 'required', template: 'select' }] },
      }).sex
      const err = await runAntd(req, '').catch((e: Error) => e)
      expect(err.message).toContain('选择')
    })
  })

  describe('locale 切换', () => {
    test('setLocale 切换语言', () => {
      const v = makeAntd()
      expect(v.locale).toBe('zhCN')
      v.setLocale('enUS')
      expect(v.locale).toBe('enUS')
    })

    test('不存在的 locale 打印警告且不切换', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
      const v = makeAntd()
      v.setLocale('jaJP')
      expect(v.locale).toBe('zhCN')
      expect(warn).toHaveBeenCalled()
      warn.mockRestore()
    })

    test('errorPhase sync：切换 locale 后消息同步更新', async () => {
      const v = makeAntd({ errorPhase: 'sync' })
      const [req] = v.schema({ name: { label: 'name', rules: ['required'] } }).name

      const zhErr = await runAntd(req, '').catch((e: Error) => e)
      expect(zhErr.message).toMatch(/请输入/)

      v.setLocale('enUS')
      const enErr = await runAntd(req, '').catch((e: Error) => e)
      expect(enErr.message).toMatch(/Please enter/)
    })

    test('errorPhase pre：切换 locale 后消息不变', async () => {
      const v = makeAntd({ errorPhase: 'pre' })
      const [req] = v.schema({ name: { label: 'name', rules: ['required'] } }).name

      const zhErr = await runAntd(req, '').catch((e: Error) => e)
      v.setLocale('enUS')
      const afterErr = await runAntd(req, '').catch((e: Error) => e)
      // pre 模式消息在 schema 时已固定
      expect(afterErr.message).toBe(zhErr.message)
    })
  })

  describe('trigger', () => {
    test('字符串规则继承 rule 定义的 trigger', () => {
      const v = makeAntd()
      const [req] = v.schema({ phone: { rules: ['required'] } }).phone
      expect(req.trigger).toEqual(['change', 'blur'])
    })

    test('字段级 trigger 覆盖 rule 默认', () => {
      const v = makeAntd()
      const [tel] = v.schema({ phone: { trigger: 'change', rules: ['telephone'] } }).phone
      expect(tel.trigger).toBe('change')
    })

    test('规则级 trigger 优先级最高', () => {
      const v = makeAntd()
      const [tel] = v.schema({
        phone: {
          trigger: 'change',
          rules: [{ rule: 'telephone', trigger: ['change', 'blur'] }],
        },
      }).phone
      expect(tel.trigger).toEqual(['change', 'blur'])
    })
  })

  describe('custom 规则', () => {
    test('custom 函数抛出时校验失败', async () => {
      const v = makeAntd()
      const [custom] = v.schema({
        tags: {
          type: 'array',
          rules: [{ validator: () => { throw new Error('至少选一项') } }],
        },
      }).tags
      const err = await runAntd(custom, []).catch((e: Error) => e)
      expect(err.message).toContain('至少选一项')
    })

    test('custom 函数正常返回时通过', async () => {
      const v = makeAntd()
      const [custom] = v.schema({
        tags: { rules: [{ validator: () => {} }] },
      }).tags
      await expect(runAntd(custom, 'anything')).resolves.toBeUndefined()
    })

    test('custom 函数返回 rejected Promise 时失败', async () => {
      const v = makeAntd()
      const [custom] = v.schema({
        x: { rules: [{ validator: () => Promise.reject(new Error('异步失败')) }] },
      }).x
      await expect(runAntd(custom, 'val')).rejects.toThrow('异步失败')
    })

    test('空值且无 required 时 custom 规则跳过', async () => {
      const v = makeAntd()
      const [custom] = v.schema({
        name: {
          rules: [{
            validator: () => { throw new Error('不该执行') },
          }],
        },
      }).name
      await expect(runAntd(custom, '')).resolves.toBeUndefined()
    })
  })
})

// ─── VantValidator ──────────────────────────────────────────────────────────

describe('VantValidator', () => {
  describe('trigger 映射', () => {
    test("'blur' → 'onBlur'", () => {
      const v = makeVant()
      const [tel] = v.schema({ phone: { rules: ['telephone'] } }).phone
      expect(tel.trigger).toBe('onBlur')
    })

    test("'change' → 'onChange'", () => {
      const v = makeVant()
      const [req] = v.schema({ name: { trigger: 'change', rules: ['required'] } }).name
      expect(req.trigger).toBe('onChange')
    })

    test("['change', 'blur'] → ['onChange', 'onBlur']", () => {
      const v = makeVant()
      const [req] = v.schema({ name: { rules: ['required'] } }).name
      expect(req.trigger).toEqual(['onChange', 'onBlur'])
    })
  })

  describe('返回值格式', () => {
    test('校验通过 validator 返回 true', () => {
      const v = makeVant()
      const [tel] = v.schema({ phone: { rules: ['telephone'] } }).phone
      expect(runVant(tel, '13800138000')).toBe(true)
    })

    test('校验失败 validator 返回 false，message 字段包含错误消息', () => {
      const v = makeVant()
      const [req] = v.schema({ name: { label: '姓名', rules: ['required'] } }).name
      expect(runVant(req, '')).toBe(false)
      const msg = typeof req.message === 'function' ? req.message() : req.message
      expect(msg).toContain('姓名')
    })

    test('空值且无 required 时返回 true', () => {
      const v = makeVant()
      const [tel] = v.schema({ phone: { rules: ['telephone'] } }).phone
      expect(runVant(tel, '')).toBe(true)
    })
  })

  describe('locale 切换', () => {
    test('errorPhase sync：message 为 getter，随 locale 变化', () => {
      const v = makeVant({ errorPhase: 'sync' })
      const [req] = v.schema({ name: { label: 'name', rules: ['required'] } }).name

      expect(typeof req.message).toBe('function')
      const getMsg = req.message as () => string

      expect(getMsg()).toMatch(/请输入/)
      v.setLocale('enUS')
      expect(getMsg()).toMatch(/Please enter/)
    })

    test('errorPhase pre：message 为静态字符串', () => {
      const v = makeVant({ errorPhase: 'pre' })
      const [req] = v.schema({ name: { label: 'name', rules: ['required'] } }).name
      expect(typeof req.message).toBe('string')
    })
  })

  describe('custom 规则', () => {
    test('custom 抛出时返回错误字符串', () => {
      const v = makeVant()
      const [custom] = v.schema({
        tags: {
          type: 'array',
          rules: [{ validator: () => { throw new Error('至少选一项') } }],
        },
      }).tags
      const result = runVant(custom, [1])
      expect(result).toContain('至少选一项')
    })

    test('custom 正常时返回 true', () => {
      const v = makeVant()
      const [custom] = v.schema({
        x: { rules: [{ validator: () => {} }] },
      }).x
      expect(runVant(custom, 'val')).toBe(true)
    })

    test('custom 返回 resolved Promise 时通过', async () => {
      const v = makeVant()
      const [custom] = v.schema({
        x: { rules: [{ validator: () => Promise.resolve() }] },
      }).x
      await expect(runVant(custom, 'val')).resolves.toBe(true)
    })
  })
})
