import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SlotBlock from '@/components/SlotBlock.vue'

test('SlotBlock', async () => {
  const wrapper = mount(SlotBlock, { props: { state: 'empty' } })
  expect(wrapper.find('img').attributes('src')).toBe('/img/emptyBlock.png')

  await wrapper.setProps({ state: 'spinning' })
  expect(wrapper.find('img').attributes('src')).toBe('/img/spin.svg')

  await wrapper.setProps({ state: 'revealed', symbol: 'cherry' })
  expect(wrapper.find('img').attributes('src')).toBe('/img/cherry.svg')
})
