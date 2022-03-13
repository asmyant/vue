<script setup>
import { defineProps } from 'vue';

defineProps({
  text: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    default: 'success',
  },
});
</script>

<template>
  <div :class="`alert is-${type}`">{{ text }}</div>
</template>

<style scoped lang="scss">
  .alert {
    position: relative;
    padding: 1rem 1rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: $border-radius-md;

    &.is {
      &-warning {
        color: darken(color(yellow), 60%);
        background-color: color(yellow);
        border-color: darken(color(yellow), 10%);
      }
    }
  }
</style>
