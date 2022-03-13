<script setup>
import SelectField from 'ui/SelectField.vue';
import AddForm from 'catalog/AddForm.vue';
import AlertField from 'ui/AlertField.vue';
import Product from 'catalog/Product.vue';
import LoadingField from 'ui/Loading.vue';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';

const store = useStore();
const sort = ref('');
const sortingList = computed(() => store.getters.sortingList);
const loading = computed(() => store.getters.loading);

/* Получение и сортировка товаров */
const products = computed(() => {
  const { products } = store.getters;
  store.getters.sortingList.forEach((sortItem) => {
    if (sortItem.key === sort.value) {
      /*
        Находим ключ сортировки
        Вызываем колбек сортировки
      */
      sortItem.callback(products, sortItem.productKey);
    }
  });
  /*
    sort пустой - показываем сначало новые
    sort не пустой - показываем сортированный список
   */
  return sort.value === '' ? products.slice().reverse() : products;
});

onMounted(() => store.dispatch('getStoreProducts'));
</script>

<template>
  <div class="catalog container">
    <!-- Форма -->
    <div class="catalog__form">
      <div>
        <div class="catalog__title">Добавление товара</div>
        <add-form/>
        <loading-field v-if="loading('products')"/>
      </div>
    </div>

    <div class="catalog__wrapper">
      <!-- Сортировка -->
      <div class="catalog__sorting">
        <div>Количество товаров: <b>{{ products.length }}</b></div>
        <select-field
           v-model="sort"
           :options="sortingList"
           :isDisabled="products.length <= 1"
        />
      </div>

      <!-- Вывод алерта о пустоте -->
      <alert-field
         v-if="products.length === 0 && !loading('products')"
         text="Товаров не найдено!"
         type="warning"
      />

      <!-- Товары -->
      <TransitionGroup tag="div" name="fade" class="catalog__products">
        <div v-for="product in products" :key="product.id" class="catalog__product">
          <product :product="product"/>
        </div>
      </TransitionGroup>

      <!-- Загрузка -->
      <loading-field v-if="loading('products')"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .catalog {
    padding-top: 2rem;
    padding-bottom: 2rem;
    position: relative;

    @media (max-width: 767px) {
      padding-bottom: 1rem;
      padding-top: 1rem;
    }

    @media (min-width: 991px) {
      display: flex;
      flex-wrap: nowrap;
    }

    &__sorting {
      margin-left: auto;
      display: flex;
      margin-bottom: 1rem;
    }

    &__sorting {
      margin-bottom: 1rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      select {
        margin-left: 1rem;
      }
    }

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    &__title {
      font-weight: 600;
      font-size: 1.75rem;
    }

    &__form {
      position: relative;
      margin-bottom: 2rem;
      margin-right: 0;

      @media (min-width: 991px) {
        flex: 0 0 20.80rem;
        max-width: 20.80rem;
        margin-bottom: 0;
        margin-right: 1rem;
      }

      & > div {
        position: sticky;
        top: 1rem;
      }
    }

    &__wrapper {
      flex-grow: 1;
      position: relative;

      @media (min-width: 1200px) {
        min-height: 80vh;
      }
    }

    &__products {
      display: flex;
      margin: 0 -.5rem;
      margin-bottom: -1rem;
      flex-wrap: wrap;
    }

    &__product {
      padding: 0 .5rem;
      margin-bottom: 1rem;
      flex: 0 0 100%;
      max-width: 100%;

      @media (min-width: 576px) {
        flex: 0 0 33.33%;
        max-width: 33.33%;

        @media (max-width: 1200px) and (min-width: 991px) {
          flex: 0 0 50%;
          max-width: 50%;
        }

        @media (max-width: 767px) {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
    }
  }
</style>
