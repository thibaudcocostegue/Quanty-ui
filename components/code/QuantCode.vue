<script setup lang="ts">
interface QuantCodeProps {
  variant?: 'ticker' | 'numeric' | 'formula'
  inline?: boolean
}

const props = withDefaults(defineProps<QuantCodeProps>(), {
  variant: 'numeric',
  inline: true
})

const tag = props.inline ? 'code' : 'pre'
</script>

<template>
  <component
    :is="tag"
    :class="['quant-code', `quant-code--${props.variant}`, props.inline ? 'quant-code--inline' : 'quant-code--block']"
  >
    <slot />
  </component>
</template>

<style scoped>
.quant-code {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  margin: 0;
}

.quant-code--inline {
  display: inline;
}

.quant-code--block {
  display: block;
}

/* Variant styles */
.quant-code--ticker {
  font-size: var(--font-size-sm);
  color: var(--color-signal);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.05em;
}

.quant-code--numeric {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  font-weight: var(--font-weight-normal);
}

.quant-code--formula {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  background: var(--surface-inset);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}
</style>
