import { describe, test, expect } from 'vitest'
import { probability, rnd } from '../../../utils'

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
