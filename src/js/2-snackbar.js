import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  if (delay < 0 || !state) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid positive delay and choose a state.',
      position: 'topRight',
    });
    return;
  }

  const promise = createPromise(delay, state);

  promise
    .then(result => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
      });
    });

  event.currentTarget.reset();
}

form.addEventListener('submit', handleSubmit);
