<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    required: true,
    type: String,
  },
  type: {
    type: String,
  },
});
</script>

<template>
  <button
     type="button"
     class="btn"
     :class="[type]"
  >
    {{title}}
  </button>
</template>

<style scoped lang="scss">
  .btn {
    border-radius: $border-radius-md;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    position: relative;
    width: 100%;
    color: white;
    background: color(green);
    cursor: pointer;
    border: none;
    transition: background-color .3s;

    &[disabled] {
      background-color: color(greyLight);
      color: color(grey);
      cursor: no-drop;
    }

    &:hover {
      &:not([disabled]) {
        background: darken(color(green), 20%);
      }
    }

    &.danger {
      background-color: color(pink);

      &:hover {
        background-color: darken(color(pink), 10%);
      }
    }

    &.info {
      background-color: color(green);
    }
  }
</style>
