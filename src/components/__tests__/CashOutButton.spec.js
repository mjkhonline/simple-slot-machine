import { describe, expect, it, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CashOutButton from '@/components/CashOutButton.vue'
import * as utils from '../../../utils'

describe('CashOutButton', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('emits "clicked" event when clicked, not disabled and clickable', async () => {
    const wrapper = mount(CashOutButton, {
      props: { isDisabled: false }
    })
    wrapper.vm.isClickable = true
    await wrapper.trigger('click')
    expect(wrapper.emitted().clicked).toBeTruthy()
  })

  it('does not emit "clicked" event when clicked and disabled', async () => {
    const wrapper = mount(CashOutButton, {
      props: { isDisabled: true }
    })
    wrapper.vm.isClickable = true
    await wrapper.trigger('click')
    expect(wrapper.emitted().clicked).toBeFalsy()
  })

  it('does not emit "clicked" event when clicked, not disabled and not clickable', async () => {
    const wrapper = mount(CashOutButton, {
      props: { isDisabled: false }
    })
    wrapper.vm.isClickable = false
    await wrapper.trigger('click')
    expect(wrapper.emitted().clicked).toBeFalsy()
  })

  it('moves to a random position on mouseover', async () => {
    const wrapper = mount(CashOutButton)
    const probabilitySpy = vi.spyOn(utils, 'probability')
    probabilitySpy.mockImplementation(() => true)
    await wrapper.trigger('mouseover')
    expect(wrapper.vm.$el.style.transform).not.toBe('')
    expect(wrapper.vm.$el.style.transform).not.toBe('translate(0, 0)')
  })

  it('returns to the default position when resetPosition is called', async () => {
    const wrapper = mount(CashOutButton)
    await wrapper.trigger('mouseover')
    await wrapper.vm.resetPosition()
    expect(wrapper.vm.$el.style.transform).toBe('translate(0, 0)')
  })
})
