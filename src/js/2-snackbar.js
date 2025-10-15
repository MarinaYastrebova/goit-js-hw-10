import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// 1. Отримання елементів DOM
const form = document.querySelector('.form');

// 2. Функція, що створює та повертає проміс
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    // Встановлюємо таймер на вказану затримку
    setTimeout(() => {
      if (state === 'fulfilled') {
        // Якщо обрано 'fulfilled', проміс виконується успішно
        resolve(delay);
      } else {
        // Якщо обрано 'rejected', проміс відхиляється
        reject(delay);
      }
    }, delay);
  });
}

// 3. Обробник сабміту форми
function handleSubmit(event) {
  event.preventDefault(); // Запобігаємо стандартній перезавантаженню сторінки

  // Збираємо дані з форми
  const formData = new FormData(event.currentTarget);
  const delay = Number(formData.get('delay')); // Отримуємо затримку (ms)
  const state = formData.get('state'); // Отримуємо стан ('fulfilled' або 'rejected')

  if (delay < 0 || !state) {
    // Валідація на випадок, якщо HTML-валідація не спрацює
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid positive delay and choose a state.',
      position: 'topRight',
    });
    return;
  }

  // 4. Створюємо проміс
  const promise = createPromise(delay, state);

  // 5. Обробляємо результат промісу
  promise
    .then(result => {
      // ✅ Проміс виконано успішно
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      // ❌ Проміс відхилено
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
      });
    });

  // Очищаємо поле вводу після сабміту (опціонально)
  event.currentTarget.reset();
}

// 6. Додаємо слухача події сабміту
form.addEventListener('submit', handleSubmit);
