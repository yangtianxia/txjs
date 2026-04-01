import { BEM } from '../src'

describe('BEM', () => {
  describe('basic usage', () => {
    const [name, bem] = BEM('home')

    test('name returns block name', () => {
      expect(name).toBe('home')
    })

    test('bem() returns block name', () => {
      expect(bem()).toBe('home')
    })

    test('bem([modifier]) returns block with modifier', () => {
      expect(bem(['wrapper'])).toBe('home home--wrapper')
    })

    test('bem(element) returns element', () => {
      expect(bem('container')).toBe('home__container')
    })

    test('bem(element, [modifiers]) returns element with modifiers', () => {
      expect(bem('item', ['active'])).toBe('home__item home__item--active')
    })

    test('bem(element, { modifier: false }) ignores false modifier', () => {
      expect(bem('body', { safearea: false })).toBe('home__body')
    })

    test('bem(element, { modifier: true }) adds modifier', () => {
      expect(bem('body', { safearea: true })).toBe(
        'home__body home__body--safearea'
      )
    })

    test('bem([modifiers]) with multiple modifiers', () => {
      expect(bem(['active', 'disabled'])).toBe(
        'home home--active home--disabled'
      )
    })

    test('bem(element, { modifiers }) with multiple modifiers', () => {
      expect(bem('button', { primary: true, disabled: true })).toBe(
        'home__button home__button--primary home__button--disabled'
      )
    })
  })

  describe('CSS modules mode', () => {
    const [name, bem] = BEM('home', {
      home: 'home_rBuQtM97',
      home__search: 'home__search_sdguKKAS',
      home__menu: 'home__menu_odDpsFd1',
      'home--wrapper': 'home--wrapper_CLASS',
    })

    test('name returns block name', () => {
      expect(name).toBe('home')
    })

    test('bem() returns hashed class', () => {
      expect(bem()).toBe('home_rBuQtM97')
    })

    test('bem(element) returns hashed element class', () => {
      expect(bem('search')).toBe('home__search_sdguKKAS')
    })

    test('bem(element) returns hashed element class for menu', () => {
      expect(bem('menu')).toBe('home__menu_odDpsFd1')
    })

    test('bem([modifier]) returns hashed modifier class', () => {
      expect(bem(['wrapper'])).toBe('home_rBuQtM97 home--wrapper_CLASS')
    })
  })

  describe('BEM.config', () => {
    test('can configure mode to always', () => {
      const [, bem] = BEM('block', {
        block: 'hashed-block',
        'block--active': 'hashed-active',
      })

      BEM.config({ mode: 'always' })

      expect(bem(['active'])).toBe('hashed-block hashed-active')

      BEM.config({ mode: 'match' })
    })

    test('can reset config', () => {
      BEM.config({ mode: 'match' })
      const [, bem] = BEM('test')
      expect(bem(['active'])).toBe('test test--active')
    })
  })

  describe('edge cases', () => {
    test('bem with empty modifiers array', () => {
      const [, bem] = BEM('block')
      expect(bem([])).toBe('block')
    })

    test('bem with all false modifiers', () => {
      const [, bem] = BEM('block')
      expect(bem('el', { a: false, b: false })).toBe('block__el')
    })

    test('bem with mixed modifiers', () => {
      const [, bem] = BEM('block')
      expect(bem('el', { active: true, disabled: false })).toBe(
        'block__el block__el--active'
      )
    })
  })
})
