/**
 * 真实用例：AntdValidator + VantValidator 输出对比
 *
 * 消息模板规则：
 *   [0]  → 替换为 label
 *   {0}  → 替换为 param（规则参数）
 *   数组消息 ['[0]格式无效', '手机号码'] →
 *     messages[0] 是模板，messages[1] 是内置 label（label 传入时覆盖）
 */

import { AntdValidator } from '../src/antd'
import { VantValidator } from '../src/vant'
import defaultRules from '../src/rules'
import zhCN from '../src/locale/zhCN'
import enUS from '../src/locale/enUS'

// ─── 表单数据结构 ────────────────────────────────────────────────────────────

interface FormData {
  phone: string
  age: number
  sex: string
  tags: number[]
}

// ─── AntdValidator ──────────────────────────────────────────────────────────

const antd = new AntdValidator({
  locale: 'zhCN',
  locales: { zhCN, enUS },
  rules: defaultRules,
  errorPhase: 'sync', // 消息为 getter，切换 locale 后无需重新执行 schema()
})

const antdSchema = antd.schema<FormData>({
  phone: {
    label: '手机号',
    rules: ['required', 'telephone'],
  },
  age: {
    label: '年龄',
    rules: [
      { rule: 'min', value: 18 },
      { rule: 'max', value: 60 },
    ],
  },
  sex: {
    label: '性别',
    rules: [{ rule: 'required', template: 'select' }],
  },
  tags: {
    type: 'array',
    label: '兴趣爱好',
    rules: [
      {
        validator: (value: number[]) => {
          if (!value.length) throw new Error('请至少选择一项')
        },
      },
    ],
  },
})

/*
 * antdSchema.phone →
 * [
 *   {
 *     type: 'string',
 *     rule: 'required',
 *     trigger: ['change', 'blur'],   ← defaultRules.required.trigger
 *     message: () => '请输入手机号', ← zhCN.required.default='请输入[0]', [0]→'手机号'
 *     validator: (_, value) => Promise<void>
 *   },
 *   {
 *     type: 'string',
 *     rule: 'telephone',
 *     trigger: 'blur',               ← defaultRules.telephone.trigger
 *     message: () => '手机号格式无效',
 *     ← zhCN.telephone.default=['[0]格式无效','手机号码'], label='手机号'覆盖内置label
 *     validator: (_, value) => Promise<void>
 *   }
 * ]
 *
 * antdSchema.age →
 * [
 *   {
 *     type: 'string',
 *     rule: 'min',
 *     trigger: 'blur',               ← 全局默认（min 规则无内置 trigger）
 *     message: () => '年龄不能小于18',
 *     ← zhCN.min.default='[0]不能小于{0}', [0]→'年龄', {0}→18
 *     validator: (_, value) => Promise<void>
 *   },
 *   {
 *     type: 'string',
 *     rule: 'max',
 *     trigger: 'blur',
 *     message: () => '年龄不能大于60',
 *     validator: (_, value) => Promise<void>
 *   }
 * ]
 *
 * antdSchema.sex →
 * [
 *   {
 *     type: 'string',
 *     rule: 'required',
 *     trigger: ['change', 'blur'],
 *     message: () => '请选择性别',
 *     ← template:'select' → zhCN.required.select='请选择[0]', [0]→'性别'
 *     validator: (_, value) => Promise<void>
 *   }
 * ]
 *
 * antdSchema.tags →
 * [
 *   {
 *     type: 'array',
 *     trigger: 'blur',
 *     validator: (_, value) => Promise<void>
 *     ← value=[]  → rejects  Error('请至少选择一项')
 *     ← value=[1] → resolves
 *   }
 * ]
 */

// ─── 验证调用示例 ────────────────────────────────────────────────────────────

async function antdExamples() {
  const [required, telephone] = antdSchema.phone

  // 空值 → required 失败
  await required.validator({}, '')
  // → rejects: Error('请输入手机号')

  // 非空值 → required 通过
  await required.validator({}, '13800138000')
  // → resolves

  // 非法手机号 → telephone 失败
  await telephone.validator({}, '123')
  // → rejects: Error('手机号格式无效')

  // 合法手机号 → 通过
  await telephone.validator({}, '13800138000')
  // → resolves

  // 切换语言后，同一个 rule 对象的消息自动更新（errorPhase:'sync'）
  antd.setLocale('enUS')
  await required.validator({}, '')
  // → rejects: Error('Please enter name')  ← message getter 重新求值
  antd.setLocale('zhCN')

  // age: 值小于 18
  const [minRule] = antdSchema.age
  await minRule.validator({}, 17)
  // → rejects: Error('年龄不能小于18')

  await minRule.validator({}, 18)
  // → resolves

  // tags: 空数组
  const [tagsRule] = antdSchema.tags
  await tagsRule.validator({}, [])
  // → rejects: Error('请至少选择一项')

  await tagsRule.validator({}, [1, 2])
  // → resolves
}

// ─── VantValidator ──────────────────────────────────────────────────────────

const vant = new VantValidator({
  locale: 'zhCN',
  locales: { zhCN, enUS },
  rules: defaultRules,
  errorPhase: 'sync',
})

const vantSchema = vant.schema<FormData>({
  phone: {
    label: '手机号',
    rules: ['required', 'telephone'],
  },
  age: {
    label: '年龄',
    rules: [{ rule: 'min', value: 18 }],
  },
  tags: {
    type: 'array',
    label: '兴趣爱好',
    rules: [
      {
        validator: (value: number[]) => {
          if (!value.length) throw new Error('请至少选择一项')
        },
      },
    ],
  },
})

/*
 * vantSchema.phone →
 * [
 *   {
 *     trigger: ['onChange', 'onBlur'],  ← ['change','blur'] 自动映射
 *     validateEmpty: true,              ← hasRequired=true，不跳过空值校验
 *     message: (_value, _rule) => '请输入手机号',  ← sync 模式，函数形式
 *     validator: (value) => boolean
 *     ← value=''          → false
 *     ← value='138...'    → true
 *   },
 *   {
 *     trigger: 'onBlur',               ← 'blur' 映射
 *     validateEmpty: true,
 *     message: (_value, _rule) => '手机号格式无效',
 *     validator: (value) => boolean
 *     ← value='123'       → false
 *     ← value='13800138000' → true
 *   }
 * ]
 *
 * vantSchema.age →
 * [
 *   {
 *     trigger: 'onBlur',
 *     validateEmpty: false,            ← 无 required，空值时 Vant 自动跳过
 *     message: (_value, _rule) => '年龄不能小于18',
 *     validator: (value) => boolean
 *     ← value=17 → false
 *     ← value=18 → true
 *   }
 * ]
 *
 * vantSchema.tags →
 * [
 *   {
 *     trigger: 'onBlur',
 *     validateEmpty: false,
 *     validator: (value) => boolean | string
 *     ← value=[]  → '请至少选择一项'  （custom 规则：抛出 Error → 返回字符串）
 *     ← value=[1] → true
 *   }
 * ]
 */

function vantExamples() {
  const [required, telephone] = vantSchema.phone

  required.validator!('')
  // → false （消息在 required.message 里）

  required.validator!('13800138000')
  // → true

  // message 是响应式 getter，切换语言立即生效（无需重新验证）
  const getMsgZh = required.message as (v: any, r: any) => string
  getMsgZh('', required)
  // → '请输入手机号'

  vant.setLocale('enUS')
  getMsgZh('', required)
  // → 'Please enter name'
  vant.setLocale('zhCN')

  telephone.validator!('123')
  // → false

  telephone.validator!('13800138000')
  // → true

  const [tagsRule] = vantSchema.tags
  tagsRule.validator!([])
  // → '请至少选择一项'  （custom 规则直接返回错误字符串）

  tagsRule.validator!([1])
  // → true
}
