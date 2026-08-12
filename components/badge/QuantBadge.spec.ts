import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuantBadge from './QuantBadge.vue'

describe('QuantBadge', () => {
  it('renders slot content', () => {
    const wrapper = mount(QuantBadge, { slots: { default: '+12.5%' } })
    expect(wrapper.text()).toBe('+12.5%')
  })

  it('applies default tone/size classes', () => {
    const wrapper = mount(QuantBadge)
    expect(wrapper.classes()).toContain('quant-badge--neutral')
    expect(wrapper.classes()).toContain('quant-badge--md')
  })

  it('applies tone and size props', () => {
    const wrapper = mount(QuantBadge, { props: { tone: 'profit', size: 'sm' } })
    expect(wrapper.classes()).toContain('quant-badge--profit')
    expect(wrapper.classes()).toContain('quant-badge--sm')
  })

  it('applies pill modifier class', () => {
    const wrapper = mount(QuantBadge, { props: { pill: true } })
    expect(wrapper.classes()).toContain('quant-badge--pill')
  })
})
