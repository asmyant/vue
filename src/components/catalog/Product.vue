<script setup>
import LoadingField from 'ui/Loading.vue';
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

const store = useStore();
const loading = ref(false);
const toast = useToast();
const props = defineProps({
  product: {
    require: true,
    type: [Object, Array],
  },
});

/* Удаление товара */
function deleteProduct() {
  loading.value = true;
  store.dispatch('deleteStoreProduct', props.product.id).then(() => {
    loading.value = false;
    toast.success('Вы успено удалили товар!');
  });
}
</script>

<template>
  <div class="product" :class="{'is-removal': loading}">
    <button
       type="button"
       @click="deleteProduct"
       class="product__delete"
    >
      <loading-field theme="white" size="xs" v-if="loading"/>
      <svg class="icon" width="20" height="24" v-if="!loading">
        <use xlink:href="@/assets/images/svg-sprite.svg#delete"></use>
      </svg>
    </button>

    <img :src="product.image" :alt="product.title" class="product__picture">

    <div class="product__content">
      <div>
        <div class="product__title">{{product.title}}</div>
        <div class="product__text" v-if="product.description">
          {{product.description}}
        </div>
      </div>

      <div class="product__price">
        {{Number(product.price).toLocaleString()}} руб.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .product {
    box-shadow: $box-shadow-md;
    border-radius: $border-radius-sm;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: color(light);
    position: relative;
    transition: transform .3s;

    @media (min-width: 768px) {
      &:not(.is-removal) {
        .product {
          &__delete {
            visibility: hidden;
            opacity: 0;
          }
        }
      }
    }

    &:hover {
      .product {
        &__delete {
          visibility: visible;
          opacity: 1;
        }
      }
    }

    &.bounced {
      transform: scale(1.2);
    }

    &__picture {
      height: 200px;
      object-fit: cover;
      width: 100%;
      border-radius: $border-radius-sm $border-radius-sm 0 0;
    }

    &__title {
      margin-bottom: 1rem;
      font-size: 1.25rem;
      font-weight: 600;
    }

    &__text {
      margin-bottom: 2rem;
      line-height: 130%;
    }

    &__price {
      font-weight: 600;
      font-size: 1.25rem;
    }

    &__delete {
      border-radius: $border-radius-md;
      background: color(pink);
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border: none;
      cursor: pointer;
      box-shadow: $box-shadow-lg;
      z-index: 2;
      color: white;
      transition: visibility .3s, opacity .3s;

      @media (max-width: 767px) {
        top: 1rem;
        right: 1rem;
      }

      @media (min-width: 768px) {
        left: calc(100% - (2rem / 2));
        bottom: calc(100% - (2rem / 2));
      }

      svg{
        display: block;
      }
    }

    &__content {
      padding: 1rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      border-radius: 0 0 $border-radius-sm $border-radius-sm;
      justify-content: space-between;
    }
  }
</style>
