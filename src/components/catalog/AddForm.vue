<script setup>
import InputField from 'ui/InputField.vue';
import ButtonField from 'ui/ButtonField.vue';
import LoadingField from 'ui/Loading.vue';
import {
  reactive,
  onBeforeMount,
  computed,
} from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

const store = useStore();
const loading = computed(() => store.getters.loading);
const toast = useToast();
const productsLength = computed(() => store.getters.productsLength);
/* Информация для формы */
const fields = reactive([
  {
    title: 'Наименование товара',
    placeholder: 'Введите наименование товара',
    required: true,
    validation: {
      valid: false,
      errorMessage: 'Поле является обязательным',
      type: 'empty',
    },
    productKey: 'title', // Соответствует ключу товара
    value: '',
  },
  {
    title: 'Описание товара',
    placeholder: 'Введите описание товара',
    textarea: true,
    productKey: 'description', // Соответствует ключу товара
    value: '',
  },
  {
    title: 'Ссылка на изображение товара',
    placeholder: 'Введите ссылку',
    required: true,
    validation: {
      valid: false,
      errorMessage: 'Поле является обязательным',
      type: 'empty',
    },
    productKey: 'image', // Соответствует ключу товара
    value: '',
  },
  {
    title: 'Цена товара',
    placeholder: 'Введите цену',
    required: true,
    type: 'number',
    validation: {
      valid: false,
      errorMessage: 'Поле является обязательным',
      type: 'empty',
    },
    productKey: 'price', // Соответствует ключу товара
    value: '',
  },
]);

// Провека на валидность формы
const isValidForm = computed(() => fields.findIndex((field) => field.validation !== undefined
        && field.validation.valid === false) >= 0);

// Обнуление формы
function resetForm() {
  fields.forEach((field) => {
    field.value = '';
    field.firstLoad = true;
    if (field.validation !== undefined) {
      field.validation.valid = false;
    }
  });
}

// Проверка на валидность инпута
function fieldIsInvalid(field) {
  return field.validation !== undefined && !field.validation.valid && !field.firstLoad;
}

// Добавление в хранилище
function addProductItem() {
  const product = {};

  // Создаем обьект товара по ключам
  fields.forEach((field) => {
    const { productKey, value } = field;
    product[productKey] = value;
  });

  // Добавление в хранилище
  store.dispatch('addStoreProduct', { product }).then(() => {
    resetForm();
    toast.success('Вы успешно добавили товар!');
  });
}

// Основная функция валидации
function validationForm(field) {
  if (field.validation !== undefined) {
    const { type } = field.validation;

    field.firstLoad = false;

    /* Валидация на пустоту */
    if (type === 'empty') {
      field.validation.valid = field.value !== '';
    }
  }
}

// Импорт демо товаров
function loadDemoProducts() {
  store.dispatch('getDemoProducts');
}

// Удалить все товары
function deleteAllProducts() {
  store.dispatch('deleteAllProducts');
}

onBeforeMount(() => {
  fields.forEach((field) => {
    field.firstLoad = true;
  });
});
</script>

<template>
  <div class="form" id="add-form">
    <loading-field v-if="loading('addProduct')"/>
    <input-field
       v-for="field in fields"
       :key="field.title"
       :type="field.type ?? 'text'"
       :title="field.title"
       :required="field.required"
       :placeholder="field.placeholder"
       :textarea="field.textarea"
       :error-message="field.validation?.errorMessage"
       :class="{'is-invalid': fieldIsInvalid(field)}"
       v-model="field.value"
       @update:modelValue="validationForm(field)"
    />
    <div>
      <button-field
         @click="addProductItem"
         title="Добавить товар"
         :disabled="isValidForm"
      />
      <button-field
         v-if="productsLength >= 1"
         @click="deleteAllProducts"
         title="Удалить все товары"
         type="danger"
      ></button-field>
      <button-field
         v-if="productsLength === 0"
         @click="loadDemoProducts"
         title="Импортировать товары"
         type="info"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .form {
    box-shadow: $box-shadow-md;
    border-radius: $border-radius-sm;
    background: color(light);
    padding: 1.563rem;
    position: relative;

    .btn {
      &:not(first-child) {
        margin-top: .5rem;
      }
    }

    & > * {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      &:last-child {
        margin-top: 1.563rem;
      }
    }
  }
</style>
