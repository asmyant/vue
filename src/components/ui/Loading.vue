<script setup>
import { defineProps } from 'vue';

defineProps({
  theme: {
    type: String,
    default: 'pink',
  },
  size: {
    type: String,
    default: 'md',
  },
  bg: {
    type: String,
    default: 'background',
  },
});
</script>

<template>
  <div class="loading" :class="[`is-${theme}`, `is-${size}`, `is-${bg}`]"></div>
</template>

<style scoped lang="scss">
  .loading {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    align-items: center;
    justify-content: center;
    display: flex;

    &.is-white {
      &:before {
        border-color: white;
        border-right-color: transparent;
      }
    }

    &.is-xs {
      &:before {
        width: 1rem;
        height: 1rem;
        border-width: 0.15rem;
      }
    }

    &.is-background {
      &:after {
        content: '';
        top: 0;
        left: 0;
        z-index: 20;
        right: 0;
        position: absolute;
        bottom: 0;
        background-color: rgba(color(light), .3);
      }
    }

    &:before {
      content: '';
      width: 2rem;
      height: 2rem;
      border: 0.25em solid color(pink);
      border-right-color: transparent;
      border-radius: 50%;
      animation: .75s linear infinite rotate;
      display: block;
      position: absolute;
      z-index: 92;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
