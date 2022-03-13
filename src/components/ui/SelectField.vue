<script setup>
import { defineProps } from 'vue';

defineProps({
  options: {
    type: Array,
    require: true,
  },
  modelValue: {
    type: String,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <select
     @input="$emit('update:modelValue', $event.target.value)"
     :class="{'is-disabled': isDisabled}"
  >
    <option
       v-for="option in options"
       :key="option"
       :value="option.key"
    >
      {{ option.title }}
    </option>
  </select>
</template>

<style scoped lang="scss">
  select {
    border-radius: $border-radius-sm;
    height: 2rem;
    box-shadow: $box-shadow-lg;
    cursor: pointer;
    padding: 0 .5rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    color: color(dark);
    border: 1px solid color(light);
    background: color(light);

    &.is-disabled {
      pointer-events: none;
      background-image: none;
      cursor: no-drop;
      opacity: .7;
    }

    &:focus {
      outline: none;
      border: 1px solid color(pink);
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(color(pink), 0.25);
    }
  }
</style>
