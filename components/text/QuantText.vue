<script setup lang="ts">
interface QuantTextProps {
  variant?: 'body' | 'label' | 'caption'
  color?: 'primary' | 'secondary' | 'muted'
  as?: string
}

const props = withDefaults(defineProps<QuantTextProps>(), {
  variant: 'body',
  color: 'primary',
  as: 'p'
})
</script>

<template>
  <component
    :is="props.as"
    :class="['quant-text', `quant-text--${props.variant}`, `quant-text--${props.color}`]"
  >
    <slot />
  </component>
</template>

<style scoped>
.quant-text {
  margin: 0;
}

/* Variant styles */
.quant-text--body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

.quant-text--label {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-tight);
  font-weight: var(--font-weight-medium);
}

.quant-text--caption {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
}

/* Color variants */
.quant-text--primary {
  color: var(--text-primary);
}

.quant-text--secondary {
  color: var(--text-secondary);
}

.quant-text--muted {
  color: var(--text-muted);
}

/* Caption defaults to secondary color */
.quant-text--caption.quant-text--primary {
  color: var(--text-secondary);
}
</style>
