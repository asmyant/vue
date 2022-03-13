/**
 * Сортировка по алфавиту
 * @param array - массив сортировки
 * @param key - ключ для сортировки
 * @returns {*} - отсортированный массив [a, c, b] - [a, b, c]
 */
export const sortABC = (array, key) => array.sort((a, b) => {
  if (a[key] < b[key]) {
    return -1;
  }
  if (a[key] > b[key]) {
    return 1;
  }
  return 0;
});

/**
 * Сортировка по убыванию
 * @param array - массив сортировки
 * @param key - ключ для сортировки
 * @returns {*} - отсортированный массив [2, 1, 3] - [3, 2, 1]
 */
export const sortIntBottom = (array, key) => array.sort((a, b) => b[key] - a[key]);

/**
 * Сортировка по росту
 * @param array - массив сортировки
 * @param key - ключ для сортировки
 * @returns {*} - отсортированный массив [2, 1, 3] - [1, 2, 3]
 */
export const sortIntTop = (array, key) => array.sort((a, b) => a[key] - b[key]);
