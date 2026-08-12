import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuantButton from './QuantButton.vue'

describe('QuantButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(QuantButton, { slots: { default: 'Buy' } })
    expect(wrapper.text()).toBe('Buy')
  })

  it('applies tone/variant/size classes', () => {
    const wrapper = mount(QuantButton, { props: { tone: 'profit', variant: 'outline', size: 'lg' } })
    expect(wrapper.classes()).toContain('quant-button--profit')
    expect(wrapper.classes()).toContain('quant-button--outline')
    expect(wrapper.classes()).toContain('quant-button--lg')
  })

  it('emits click when enabled', async () => {
    const wrapper = mount(QuantButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click and sets disabled attr when disabled', async () => {
    const wrapper = mount(QuantButton, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('is disabled and aria-busy while loading', () => {
    const wrapper = mount(QuantButton, { props: { loading: true } })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
