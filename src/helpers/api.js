/* Время искусственной задержки */
const serverSleepTime = 1000;

/* Имитация задержки */
export default (data) => new Promise((r) => {
  setTimeout(() => {
    r(data);
  }, serverSleepTime);
});
