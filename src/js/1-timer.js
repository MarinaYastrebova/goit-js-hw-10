import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.querySelector(`#datetime-picker`);
const startButton = document.querySelector(`[data-start]`);

let userSelectedDate = null;

startButton.disabled = true;
