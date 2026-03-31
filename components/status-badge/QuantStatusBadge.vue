<script setup lang="ts">
interface QuantStatusBadgeProps {
  state?: 'positive' | 'attention' | 'inactive'
}

const props = withDefaults(defineProps<QuantStatusBadgeProps>(), {
  state: 'inactive'
})
</script>

<template>
  <span class="quant-status-badge" :class="`quant-status-badge--${props.state}`">
    <slot />
  </span>
</template>

<style scoped>
.quant-status-badge {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border-default);
  background: var(--surface-base);
  padding: 0 var(--spacing-2);
  font-size: var(--font-size-xs);
  line-height: 1.8;
  font-weight: var(--font-weight-medium);
}

.quant-status-badge--positive {
  color: var(--color-profit);
}

.quant-status-badge--attention {
  border-color: var(--color-warning);
  color: var(--color-warning);
}

.quant-status-badge--inactive {
  color: var(--text-secondary);
}
</style>
