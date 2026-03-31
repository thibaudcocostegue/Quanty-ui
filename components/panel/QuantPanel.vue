<script setup lang="ts">
interface QuantPanelProps {
  title?: string
}

withDefaults(defineProps<QuantPanelProps>(), {
  title: ''
})
</script>

<template>
  <section class="quant-panel">
    <header v-if="title || $slots.header" class="quant-panel__header">
      <slot name="header">
        <h2 class="quant-panel__title">{{ title }}</h2>
      </slot>
    </header>
    <div class="quant-panel__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.quant-panel {
  border: 1px solid var(--border-default);
  background: var(--surface-base);
  color: var(--text-primary);
}

.quant-panel:focus-within {
  border-color: var(--border-focus);
}

.quant-panel__header {
  padding: var(--spacing-3) var(--spacing-4);
  border-bottom: 1px solid var(--border-default);
}

.quant-panel__title {
  margin: 0;
  font-size: var(--font-size-md);
  color: var(--color-signal);
}

.quant-panel__body {
  padding: var(--spacing-4);
}
</style>
