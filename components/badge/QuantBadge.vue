<script setup lang="ts">
import { computed } from 'vue'

type QuantBadgeTone = 'neutral' | 'signal' | 'profit' | 'loss' | 'warning'
type QuantBadgeSize = 'sm' | 'md'

interface QuantBadgeProps {
  tone?: QuantBadgeTone
  size?: QuantBadgeSize
  pill?: boolean
}

const props = withDefaults(defineProps<QuantBadgeProps>(), {
  tone: 'neutral',
  size: 'md',
  pill: false,
})

const badgeClass = computed(() => [
  'quant-badge',
  `quant-badge--${props.tone}`,
  `quant-badge--${props.size}`,
  {
    'quant-badge--pill': props.pill,
  },
])
</script>

<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<style scoped>
.quant-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.quant-badge--sm {
  padding: 0 var(--spacing-2);
  font-size: var(--font-size-xs);
}

.quant-badge--md {
  padding: 0 var(--spacing-3);
  font-size: var(--font-size-sm);
}

.quant-badge--pill {
  border-radius: var(--radius-full);
}

.quant-badge--neutral {
  color: var(--text-secondary);
  background: color-mix(in srgb, var(--color-neutral) 12%, transparent);
}

.quant-badge--signal {
  color: var(--color-signal);
  background: var(--color-signal-bg);
}

.quant-badge--profit {
  color: var(--color-profit);
  background: var(--color-profit-bg);
}

.quant-badge--loss {
  color: var(--color-loss);
  background: var(--color-loss-bg);
}

.quant-badge--warning {
  color: var(--color-warning);
  background: var(--color-warning-bg);
}
</style>
