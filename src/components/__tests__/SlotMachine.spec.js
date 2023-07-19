import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SlotMachine from '@/components/SlotMachine.vue'
import SlotBlock from '@/components/SlotBlock.vue'
import * as appConfig from '../../../appConfig'

describe('SlotMachine', () => {
  beforeEach(() => {
    vi.mock('../../../appConfig', async () => {
      const actual = await vi.importActual('../../../appConfig')
      return {
        ...actual,
        REVEAL_DELAY: 0
      }
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should initialized correctly', () => {
    const wrapper = mount(SlotMachine, {
      props: {
        numberOfBlocks: 3,
        initCredit: 10
      }
    })
    expect(wrapper.vm.machine).toEqual({
      state: 'init',
      credit: 10,
      blocks: new Array(3).fill({ state: 'empty' })
    })
    expect(wrapper.find('.credit').text()).toContain(10)
    expect(wrapper.find('.state').text()).toBe("Let's Play!")
    expect(wrapper.findAllComponents(SlotBlock).length).toBe(3)
  })

  it('roll function should decrease credit by rollingCost if is not a winning roll', async () => {
    const wrapper = mount(SlotMachine)
    const initialCredit = wrapper.vm.machine.credit
    await wrapper.vm.roll()
    if (!wrapper.vm.isWinningRoll) {
      expect(wrapper.vm.machine.credit).toBe(initialCredit - wrapper.vm.props.rollingCost)
    }
  })

  it('roll function should increase credit by reward if it is a winning roll', async () => {
    const wrapper = mount(SlotMachine, {
      props: {
        numberOfBlocks: 5,
        initCredit: 10,
        rollingCost: 2
      }
    })

    vi.mock('../../../appConfig', async () => {
      const actual = await vi.importActual('../../../appConfig')
      return {
        ...actual,
        REVEAL_DELAY: 0,
        SUPPORTED_SYMBOLS: [
          {
            name: 'cherry',
            reward: 10
          }
        ]
      }
    })

    await wrapper.vm.roll()
    expect(wrapper.vm.machine.credit).toBe(
      wrapper.vm.props.initCredit +
        appConfig.SUPPORTED_SYMBOLS[0].reward -
        wrapper.vm.props.rollingCost
    )
  })

  it('resetGame function should reset machine to its initial state ', async () => {
    const wrapper = mount(SlotMachine, {
      props: {
        numberOfBlocks: 4,
        initCredit: 25
      }
    })
    await wrapper.vm.roll()
    await wrapper.vm.resetGame()
    expect(wrapper.vm.machine).toEqual({
      state: 'init',
      credit: wrapper.vm.props.initCredit,
      blocks: new Array(4).fill({ state: 'empty' })
    })
  })

  it('isWinningRoll should be true when all blocks have the same symbol', async () => {
    const wrapper = mount(SlotMachine, {
      props: { numberOfBlocks: 5 }
    })
    wrapper.vm.machine.blocks = new Array(5).fill({ state: 'revealed', symbol: 'cherry' })
    expect(wrapper.vm.isWinningRoll).toBe(true)
  })
})
