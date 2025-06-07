const { BEM } = require('../dist/index.cjs')

describe('name home test', () => {
  const [name, bem] = BEM('home')

  test('name', () => {
    expect(name).toBe('home')
  })

  test('bem()', () => {
    expect(bem()).toBe('home')
  })

  test(`bem(['wrapper'])`, () => {
    expect(bem(['wrapper'])).toBe('home home--wrapper')
  })

  test(`bem('container')`, () => {
    expect(bem('container')).toBe('home__container')
  })

  test(`bem('item', ['active'])`, () => {
    expect(bem('item', ['active'])).toBe('home__item home__item--active')
  })

  test(`bem('body', { safearea: false })`, () => {
    expect(bem('body', { safearea: false })).toBe('home__body')
  })

  test(`bem('body', { safearea: true })`, () => {
    expect(bem('body', { safearea: true })).toBe(
      'home__body home__body--safearea'
    )
  })
})

describe('css modules test', () => {
  const [name, bem] = BEM('home', {
    home: 'home_rBuQtM97',
    home__search: 'home__search_sdguKKAS',
    home__menu: 'home__menu_odDpsFd1',
  })

  test('name', () => {
    expect(name).toBe('home')
  })

  test('bem()', () => {
    expect(bem()).toBe('home_rBuQtM97')
  })

  test(`bem('search')`, () => {
    expect(bem('search')).toBe('home__search_sdguKKAS')
  })

  test(`bem('menu')`, () => {
    expect(bem('menu')).toBe('home__menu_odDpsFd1')
  })
})
