import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuantModal from './QuantModal.vue'

describe('QuantModal', () => {
  it('renders nothing when closed', () => {
    const wrapper = mount(QuantModal, { props: { modelValue: false } })
    expect(document.querySelector('.quant-modal')).toBeNull()
    wrapper.unmount()
  })

  it('renders title and slot content when open', () => {
    const wrapper = mount(QuantModal, {
      props: { modelValue: true, title: 'Confirm' },
      slots: { default: 'Are you sure?' },
    })
    expect(document.querySelector('.quant-modal__title')?.textContent).toBe('Confirm')
    expect(document.querySelector('.quant-modal__content')?.textContent).toBe('Are you sure?')
    wrapper.unmount()
  })

  it('applies size class', () => {
    const wrapper = mount(QuantModal, { props: { modelValue: true, size: 'lg' } })
    expect(document.querySelector('.quant-modal')?.classList.contains('quant-modal--lg')).toBe(true)
    wrapper.unmount()
  })

  it('emits update:modelValue and close when the close button is clicked', async () => {
    const wrapper = mount(QuantModal, { props: { modelValue: true } })
    const closeButton = document.querySelector('.quant-modal__close') as HTMLButtonElement
    closeButton.click()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toHaveLength(1)
    wrapper.unmount()
  })

  it('closes on overlay click when closeOnOverlay is true', async () => {
    const wrapper = mount(QuantModal, { props: { modelValue: true, closeOnOverlay: true } })
    const overlay = document.querySelector('.quant-modal-overlay') as HTMLElement
    overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('does not close on overlay click when closeOnOverlay is false', async () => {
    const wrapper = mount(QuantModal, { props: { modelValue: true, closeOnOverlay: false } })
    const overlay = document.querySelector('.quant-modal-overlay') as HTMLElement
    overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('closes on Escape key when open and closeOnEsc is true', async () => {
    const wrapper = mount(QuantModal, { props: { modelValue: true, closeOnEsc: true } })
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })
})
