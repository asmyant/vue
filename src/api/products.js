/**
 * Ключ продуков в localStorage
 */
const key = 'products';

/**
 * Обновление товаров
 * @param products - массив товаров
 */
const updateProducts = (products) => {
  localStorage.setItem(key, JSON.stringify(products));
};

/**
 * Получение списка товаров
 * @returns {any} - список товаров или пустой массив
 */
const getProducts = () => {
  const products = localStorage.getItem(key);
  return products !== null ? JSON.parse(products) : [];
};

/**
 * Удаление товара по id
 * @param productID - id товара
 */
const deleteProduct = (productID) => {
  const products = getProducts();
  const productIndex = products.findIndex((product) => product.id === productID);
  products.splice(productIndex, 1);
  updateProducts(products);
};

/**
 * Добавление товара
 * @param product - объект товара
 */
const addProduct = (product) => {
  const products = getProducts();
  products.push(product);
  updateProducts(products);
};

export default {
  getProducts,
  addProduct,
  deleteProduct,
  updateProducts,
};
