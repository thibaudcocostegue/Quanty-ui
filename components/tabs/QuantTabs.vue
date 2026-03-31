<script setup lang="ts">
interface QuantTabItem {
  label: string
  value: string
  disabled?: boolean
}

interface QuantTabsProps {
  modelValue: string
  items: QuantTabItem[]
}

defineProps<QuantTabsProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function selectTab(value: string, disabled?: boolean): void {
  if (!disabled) emit('update:modelValue', value)
}
</script>

<template>
  <div class="quant-tabs" role="tablist" aria-label="Tabs">
    <button
      v-for="item in items"
      :key="item.value"
      class="quant-tabs__tab"
      :class="{
        'quant-tabs__tab--active': item.value === modelValue,
        'quant-tabs__tab--disabled': item.disabled
      }"
      :disabled="item.disabled"
      role="tab"
      :aria-selected="item.value === modelValue"
      @click="selectTab(item.value, item.disabled)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
.quant-tabs {
  display: flex;
  gap: var(--spacing-2);
}

.quant-tabs__tab {
  border: 1px solid var(--border-default);
  background: var(--surface-base);
  color: var(--text-secondary);
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  cursor: pointer;
}

.quant-tabs__tab--active {
  border-color: var(--color-signal);
  color: var(--color-signal);
}

.quant-tabs__tab:not(:disabled):hover {
  background: var(--surface-subtle);
}

.quant-tabs__tab--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
