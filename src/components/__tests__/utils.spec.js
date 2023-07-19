import { describe, test, expect } from 'vitest'
import { areAllItemsEqual, probability, rnd, rndPosition } from '../../../utils'

describe('rnd function', () => {
  test('randomness', () => {
    const result = rnd(10, 20)
    expect(result).toBeGreaterThanOrEqual(10)
    expect(result).toBeLessThan(20)
  })

  test('first argument inclusive', () => {
    expect(rnd(0, 0)).toEqual(0)
  })

  test('second argument exclusive', () => {
    expect(rnd(0, 1)).toEqual(0)
  })
})

describe('probability function', () => {
  test('return value must be a boolean', () => {
    expect(probability(50)).toBeTypeOf('boolean')
  })

  test('certain probability', () => {
    expect(probability(100)).toEqual(true)
  })

  test('impossible probability', () => {
    expect(probability(0)).toEqual(false)
  })
})

describe('rndPosition function', () => {
  test('chord length', () => {
    const l = rnd(0, 500)
    const { x, y } = rndPosition(l, '')
    expect(x ** 2 + y ** 2).toBeCloseTo(l ** 2, 0)
  })
})

describe('areAllItemsEqual function', () => {
  test('all items are equal', () => {
    expect(areAllItemsEqual(['cherry', 'cherry', 'cherry'])).toEqual(true)
  })

  test('all items are not equal', () => {
    expect(areAllItemsEqual(['cherry', 'orange', 'cherry'])).toEqual(false)
  })
})
