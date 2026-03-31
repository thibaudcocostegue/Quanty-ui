<script setup lang="ts">
interface QuantKpiBlockProps {
  label: string
  value: string | number
  state?: 'default' | 'positive' | 'attention'
}

withDefaults(defineProps<QuantKpiBlockProps>(), {
  state: 'default'
})
</script>

<template>
  <article class="quant-kpi" :class="`quant-kpi--${state}`">
    <p class="quant-kpi__label">{{ label }}</p>
    <p class="quant-kpi__value"><slot>{{ value }}</slot></p>
  </article>
</template>

<style scoped>
.quant-kpi {
  border: 1px solid var(--border-default);
  background: var(--surface-base);
  padding: var(--spacing-3);
}

.quant-kpi__label {
  margin: 0;
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.quant-kpi__value {
  margin: var(--spacing-1) 0 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}

.quant-kpi--positive .quant-kpi__value {
  color: var(--color-profit);
}

.quant-kpi--attention .quant-kpi__value {
  color: var(--color-warning);
}
</style>
