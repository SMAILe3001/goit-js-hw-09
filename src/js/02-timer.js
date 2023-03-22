import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStartEl = document.querySelector('[data-start]');
const timerDaysEl = document.querySelector('[data-days]');
const timerHoursEl = document.querySelector('[data-hours]');
const timerMintesEl = document.querySelector('[data-minutes]');
const timerSecondsEl = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');

btnStartEl.disabled = true;
btnStartEl.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    const currentDate = Date.now();

    if (currentDate > selectedDates) {
      btnStartEl.disabled = true;
      Notify.warning('Please choose a date in the future');
      return;
    }
    btnStartEl.disabled = false;
    Notify.success('Now you can start the timer');
  },
};

const flatPickr = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerDaysEl.textContent = addLeadingZero(days);
  timerHoursEl.textContent = addLeadingZero(hours);
  timerMintesEl.textContent = addLeadingZero(minutes);
  timerSecondsEl.textContent = addLeadingZero(seconds);
}

function startTimer() {
  inputEl.disabled = true;
  timerId = setInterval(() => {
    const differenceDate = flatPickr.selectedDates[0] - Date.now();
    btnStartEl.disabled = true;

    if (differenceDate < 0) {
      clearInterval(timerId);
      return;
    }

    updateTimer(convertMs(differenceDate));
  }, 1000);
}
