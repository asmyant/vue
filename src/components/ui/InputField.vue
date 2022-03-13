<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  title: {
    required: true,
    type: String,
  },
  placeholder: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
  },
  textarea: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  type: {
    default: 'text',
  },
});
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="form-group">
    <label :for="title">
      <span class="form-label" :class="{'is-required': required}">
        {{ title }}
      </span>
      <input
         v-if="!textarea"
         :type="type"
         :id="title"
         :placeholder="placeholder"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         class="form-input"
      />
      <textarea
         v-else
         :id="title"
         class="form-input"
         rows="5"
         :placeholder="placeholder"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
      />
    </label>
    <div class="form-error">{{ errorMessage }}</div>
  </div>
</template>

<style scoped lang="scss">
  .form-label {
    color: color(darkLight);
    position: relative;

    &.is-required:before {
      content: '';
      position: absolute;
      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
      left: 100%;
      background: color(pink);
    }
  }

  .form-error {
    font-size: 0.75rem;
    color: color(pink);
    position: absolute;
    top: 100%;
    visibility: hidden;
    opacity: 0;
    transition: visibility .3s, opacity .3s;
  }

  .form-group {
    position: relative;

    &.is-invalid {
      .form-input {
        border-color: color(pink);
      }

      .form-error {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .form-input {
    box-shadow: $box-shadow-lg;
    border-radius: $border-radius-sm;
    background: color(light);
    border: 1px solid color(light);
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    width: 100%;
    height: 2.25rem;
    padding-left: 1rem;
    margin-top: 0.313rem;
    color: color(dark);

    @media (max-width: 767px) {
      font-size: 1rem;
    }

    &:focus {
      outline: none;
      border: 1px solid color(pink);
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(color(pink), 0.25);
    }

    &::placeholder {
      color: color(grey);
    }
  }

  textarea.form-input {
    height: initial;
    resize: none;
    padding-top: 0.625rem;
  }
</style>
