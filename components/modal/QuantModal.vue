<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

type QuantModalSize = 'sm' | 'md' | 'lg'

interface QuantModalProps {
  modelValue: boolean
  title?: string
  size?: QuantModalSize
  closeOnOverlay?: boolean
  closeOnEsc?: boolean
}

const props = withDefaults(defineProps<QuantModalProps>(), {
  title: '',
  size: 'md',
  closeOnOverlay: true,
  closeOnEsc: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

function close(): void {
  emit('update:modelValue', false)
  emit('close')
}

function onOverlayClick(): void {
  if (props.closeOnOverlay) close()
}

function onKeydown(event: KeyboardEvent): void {
  if (props.closeOnEsc && props.modelValue && event.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="quant-modal-overlay" @click.self="onOverlayClick">
      <div
        class="quant-modal"
        :class="`quant-modal--${size}`"
        role="dialog"
        aria-modal="true"
        :aria-label="title || undefined"
      >
        <header class="quant-modal__header">
          <slot name="header">
            <h3 v-if="title" class="quant-modal__title">{{ title }}</h3>
          </slot>
          <button class="quant-modal__close" type="button" aria-label="Close" @click="close">×</button>
        </header>

        <div class="quant-modal__content">
          <slot />
        </div>

        <footer v-if="$slots.footer" class="quant-modal__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.quant-modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--surface-overlay) 70%, transparent);
  z-index: var(--z-overlay);
}

.quant-modal {
  background: var(--surface-raised);
  border: 1px solid var(--border-default);
  border-radius: 0;
  box-shadow: var(--shadow-lg);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: auto;
  z-index: var(--z-modal);
}

.quant-modal--sm {
  width: 360px;
}

.quant-modal--md {
  width: 480px;
}

.quant-modal--lg {
  width: 720px;
}

.quant-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--border-subtle);
}

.quant-modal__title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-signal);
}

.quant-modal__close {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: var(--font-size-md);
  line-height: 1;
  margin-inline-start: auto;
  padding: var(--spacing-1);
}

.quant-modal__close:hover {
  color: var(--text-primary);
}

.quant-modal__content {
  padding: var(--spacing-4);
}

.quant-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-2);
  padding: var(--spacing-4);
  border-top: 1px solid var(--border-subtle);
}
</style>
