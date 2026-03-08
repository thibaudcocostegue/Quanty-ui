<script setup lang="ts">
import { computed } from 'vue'

type QuantButtonTone = 'signal' | 'neutral' | 'profit' | 'loss' | 'warning'
type QuantButtonVariant = 'solid' | 'outline' | 'ghost'
type QuantButtonSize = 'sm' | 'md' | 'lg'

interface QuantButtonProps {
  tone?: QuantButtonTone
  variant?: QuantButtonVariant
  size?: QuantButtonSize
  block?: boolean
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const props = withDefaults(defineProps<QuantButtonProps>(), {
  tone: 'signal',
  variant: 'solid',
  size: 'md',
  block: false,
  loading: false,
  disabled: false,
  type: 'button',
})

const isDisabled = computed(() => props.disabled || props.loading)

const buttonClass = computed(() => [
  'quant-button',
  `quant-button--${props.variant}`,
  `quant-button--${props.tone}`,
  `quant-button--${props.size}`,
  {
    'quant-button--block': props.block,
  },
])

function onClick(event: MouseEvent): void {
  if (isDisabled.value) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClass"
    :disabled="isDisabled"
    :aria-busy="loading"
    @click="onClick"
  >
    <span class="quant-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.quant-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  font-weight: var(--font-weight-medium);
  transition: background-color var(--transition-base), color var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-fast);
  user-select: none;
}

.quant-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.quant-button:focus-visible {
  box-shadow: 0 0 0 var(--spacing-1) color-mix(in srgb, var(--border-focus) 35%, transparent);
}

.quant-button--block {
  display: flex;
  width: 100%;
}

.quant-button--sm {
  padding: 0 var(--spacing-3);
  font-size: var(--font-size-sm);
}

.quant-button--md {
  padding: 0 var(--spacing-4);
  font-size: var(--font-size-base);
}

.quant-button--lg {
  padding: 0 var(--spacing-6);
  font-size: var(--font-size-md);
}

.quant-button--solid.quant-button--signal {
  background: var(--color-signal);
  color: var(--text-inverse);
}

.quant-button--solid.quant-button--neutral {
  background: var(--surface-subtle);
  border-color: var(--border-default);
  color: var(--text-primary);
}

.quant-button--solid.quant-button--profit {
  background: var(--color-profit);
  color: var(--text-inverse);
}

.quant-button--solid.quant-button--loss {
  background: var(--color-loss);
  color: var(--text-primary);
}

.quant-button--solid.quant-button--warning {
  background: var(--color-warning);
  color: var(--text-inverse);
}

.quant-button--outline {
  background: transparent;
}

.quant-button--outline.quant-button--signal {
  border-color: var(--color-signal);
  color: var(--color-signal);
}

.quant-button--outline.quant-button--neutral {
  border-color: var(--border-strong);
  color: var(--text-primary);
}

.quant-button--outline.quant-button--profit {
  border-color: var(--color-profit);
  color: var(--color-profit);
}

.quant-button--outline.quant-button--loss {
  border-color: var(--color-loss);
  color: var(--color-loss);
}

.quant-button--outline.quant-button--warning {
  border-color: var(--color-warning);
  color: var(--color-warning);
}

.quant-button--ghost {
  background: transparent;
}

.quant-button--ghost.quant-button--signal {
  color: var(--color-signal);
}

.quant-button--ghost.quant-button--neutral {
  color: var(--text-secondary);
}

.quant-button--ghost.quant-button--profit {
  color: var(--color-profit);
}

.quant-button--ghost.quant-button--loss {
  color: var(--color-loss);
}

.quant-button--ghost.quant-button--warning {
  color: var(--color-warning);
}

.quant-button--ghost:not(:disabled):hover,
.quant-button--outline:not(:disabled):hover {
  background: color-mix(in srgb, var(--surface-subtle) 60%, transparent);
}

.quant-button__content {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
}
</style>
