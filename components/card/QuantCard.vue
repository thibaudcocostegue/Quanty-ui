<script setup lang="ts">
interface QuantCardProps {
  title?: string
  subtitle?: string
  bordered?: boolean
  padded?: boolean
}

withDefaults(defineProps<QuantCardProps>(), {
  title: '',
  subtitle: '',
  bordered: true,
  padded: true,
})
</script>

<template>
  <section :class="['quant-card', { 'quant-card--bordered': bordered, 'quant-card--padded': padded }]">
    <header v-if="title || subtitle || $slots.header" class="quant-card__header">
      <slot name="header">
        <h3 v-if="title" class="quant-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="quant-card__subtitle">{{ subtitle }}</p>
      </slot>
    </header>

    <div class="quant-card__content">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="quant-card__footer">
      <slot name="footer" />
    </footer>
  </section>
</template>

<style scoped>
.quant-card {
  background: var(--surface-raised);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  color: var(--text-primary);
}

.quant-card--bordered {
  border: 1px solid var(--border-default);
}

.quant-card--padded {
  padding: var(--spacing-4);
}

.quant-card__header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  margin-bottom: var(--spacing-4);
}

.quant-card__title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.quant-card__subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.quant-card__content {
  display: block;
}

.quant-card__footer {
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-3);
  border-top: 1px solid var(--border-subtle);
}
</style>