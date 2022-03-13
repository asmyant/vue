import query from '@/helpers/api';
import { sortABC, sortIntTop, sortIntBottom } from '@/helpers/sorting';
import demoProducts from '@/api/demo-products';
import productsBackend from '@/api/products';

const state = () => ({
  products: [],
  loadings: {
    products: false,
    addProduct: false,
  },
  sortingList: [
    {
      callback: (array, key) => sortIntBottom(array, key),
      title: 'По умолчанию',
      productKey: 'id',
      key: 'id',
    },
    {
      callback: (array, key) => sortABC(array, key),
      title: 'По алфавиту',
      productKey: 'title',
      key: 'title',
    },
    {
      callback: (array, key) => sortIntBottom(array, key),
      title: 'Сначала дорогие',
      productKey: 'price',
      key: 'price',
    },
    {
      callback: (array, key) => sortIntTop(array, key),
      title: 'Сначала недорогие',
      productKey: 'price',
      key: 'priceReverse',
    },
  ],
});

const mutations = {
  updateProducts(state, products) {
    state.products = products;
  },
  addProduct(state, product) {
    state.products.push(product);
  },
  deleteProduct(state, productID) {
    const ID = state.products.findIndex((product) => product.id === productID);
    state.products.splice(ID, 1);
  },
  toggleLoadingByKey(state, key) {
    state.loadings[key] = !state.loadings[key];
  },
};

const actions = {
  getStoreProducts({ commit }) {
    commit('toggleLoadingByKey', 'products');
    return query(productsBackend.getProducts())
      .then((r) => {
        commit('updateProducts', r);
        commit('toggleLoadingByKey', 'products');
      })
      .catch((e) => {
        console.log(e);
      });
  },
  deleteStoreProduct({ commit }, { id }) {
    return query(productsBackend.deleteProduct(id))
      .then(() => {
        commit('deleteProduct', id);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  addStoreProduct({ commit, state }, { product }) {
    commit('toggleLoadingByKey', 'addProduct');
    const addedProduct = {
      ...product,
      id: state.products.length + 1,
    };
    return query(productsBackend.addProduct(addedProduct))
      .then(() => {
        commit('addProduct', addedProduct);
        commit('toggleLoadingByKey', 'addProduct');
      })
      .catch((e) => {
        console.log(e);
      });
  },
  getDemoProducts({ commit }) {
    productsBackend.updateProducts(demoProducts);
    commit('updateProducts', demoProducts);
  },
  deleteAllProducts({ commit }) {
    productsBackend.updateProducts([]);
    commit('updateProducts', []);
  },
};

const getters = {
  products: (state) => state.products,
  loading: (state) => (key) => state.loadings[key],
  sortingList: (state) => state.sortingList,
  productsLength: (state) => state.products.length,
};

export default {
  getters,
  actions,
  state,
  mutations,
};
