import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.querySelector(`#datetime-picker`);
const startButton = document.querySelector(`[data-start]`);

const elementsTimer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let timerIntervalId = null;

startButton.disabled = true;

function addLeadingZero(value) {
  return String(value).padStart(2, `0`);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  elementsTimer.days.textContent = addLeadingZero(days);
  elementsTimer.hours.textContent = addLeadingZero(hours);
  elementsTimer.minutes.textContent = addLeadingZero(minutes);
  elementsTimer.seconds.textContent = addLeadingZero(seconds);
}
function startCountdown() {
  if (!userSelectedDate) {
    return;
  }
  startButton.disabled = true;
  datetimePicker.disabled = true;

  if (timerIntervalId) {
    clearInterval(timerIntervalId);
  }
  const timerTick = () => {
    const currentTime = new Date();
    const msRemaining = userSelectedDate.getTime() - currentTime.getTime();

    if (msRemaining <= 0) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      datetimePicker.disabled = false;
      startButton.disabled = true;

      iziToast.success({
        title: 'Done!',
        message: 'Countdown finished!',
        position: 'topRight',
      });
      return;
    }

    const time = convertMs(msRemaining);
    updateTimerInterface(time);
  };

  timerTick();
  timerIntervalId = setInterval(timerTick, 1000);
}

startButton.addEventListener('click', startCountdown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate.getTime() <= currentDate.getTime()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
      userSelectedDate = null;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(datetimePicker, options);
