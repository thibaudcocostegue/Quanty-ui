<script setup lang="ts">
interface QuantLogRowProps {
  timestamp: string
  message: string
  level?: 'standard' | 'attention'
}

withDefaults(defineProps<QuantLogRowProps>(), {
  level: 'standard'
})
</script>

<template>
  <div class="quant-log-row" :class="`quant-log-row--${level}`">
    <span class="quant-log-row__timestamp">{{ timestamp }}</span>
    <span class="quant-log-row__message">{{ message }}</span>
    <slot name="meta" />
  </div>
</template>

<style scoped>
.quant-log-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--spacing-3);
  padding: var(--spacing-2) 0;
  border-bottom: 1px solid var(--border-subtle);
  font-size: var(--font-size-xs);
  color: var(--text-primary);
}

.quant-log-row__timestamp {
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}

.quant-log-row--attention .quant-log-row__message {
  color: var(--color-warning);
}
</style>
