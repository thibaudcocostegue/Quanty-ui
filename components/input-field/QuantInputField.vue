<script setup lang="ts">
interface QuantInputFieldProps {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  label?: string
  invalid?: boolean
}

withDefaults(defineProps<QuantInputFieldProps>(), {
  placeholder: '',
  disabled: false,
  label: '',
  invalid: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="quant-input-field">
    <span v-if="label" class="quant-input-field__label">{{ label }}</span>
    <input
      class="quant-input-field__control"
      :class="{ 'quant-input-field__control--invalid': invalid }"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
    >
  </label>
</template>

<style scoped>
.quant-input-field {
  display: grid;
  gap: var(--spacing-1);
}

.quant-input-field__label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.quant-input-field__control {
  background: var(--surface-base);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
}

.quant-input-field__control::placeholder {
  color: var(--text-muted);
}

.quant-input-field__control:focus {
  outline: none;
  border-color: var(--border-focus);
}

.quant-input-field__control--invalid {
  border-color: var(--border-default);
}
</style>
