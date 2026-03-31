<script setup lang="ts">
interface QuantAppHeaderProps {
  title: string
  subtitle?: string
}

withDefaults(defineProps<QuantAppHeaderProps>(), {
  subtitle: ''
})
</script>

<template>
  <header class="quant-app-header">
    <div>
      <h1 class="quant-app-header__title">{{ title }}</h1>
      <p v-if="subtitle" class="quant-app-header__subtitle">{{ subtitle }}</p>
    </div>
    <slot name="actions" />
  </header>
</template>

<style scoped>
.quant-app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  border: 1px solid var(--border-default);
  background: var(--surface-base);
}

.quant-app-header__title {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-signal);
}

.quant-app-header__subtitle {
  margin: var(--spacing-1) 0 0;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}
</style>
