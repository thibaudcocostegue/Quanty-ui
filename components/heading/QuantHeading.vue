<script setup lang="ts">
interface QuantHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  color?: 'primary' | 'secondary' | 'muted'
}

const props = withDefaults(defineProps<QuantHeadingProps>(), {
  color: 'primary'
})

const tag = `h${props.level}`
</script>

<template>
  <component
    :is="tag"
    :class="['quant-heading', `quant-heading--${props.color}`, `quant-heading--${props.level}`]"
  >
    <slot />
  </component>
</template>

<style scoped>
.quant-heading {
  margin: 0;
  line-height: var(--line-height-tight);
}

/* Level styles */
.quant-heading--1 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
}

.quant-heading--2 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
}

.quant-heading--3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
}

.quant-heading--4 {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
}

.quant-heading--5 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}

.quant-heading--6 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* Color variants */
.quant-heading--primary {
  color: var(--text-primary);
}

.quant-heading--secondary {
  color: var(--text-secondary);
}

.quant-heading--muted {
  color: var(--text-muted);
}
</style>
