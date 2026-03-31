<script setup lang="ts">
interface QuantSectionTitleProps {
  as?: 'h2' | 'h3' | 'h4' | 'p'
}

const props = withDefaults(defineProps<QuantSectionTitleProps>(), {
  as: 'h2'
})
</script>

<template>
  <component :is="props.as" class="quant-section-title">
    <slot />
  </component>
</template>

<style scoped>
.quant-section-title {
  margin: 0;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-signal);
}
</style>
