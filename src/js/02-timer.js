import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startButton = document.querySelector('button[data-start]');
const dateInput = document.getElementById('datetime-picker');
let countdownData = null;
let timer = null;
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');
let timerDivs = document.querySelector('.timer');
//let allFieldDivs = document.querySelectorAll('.field');
//console.log(allFieldDivs);

timerDivs.style.display = "flex";
timerDivs.style.marginTop = "20px";
// allFieldDivs.style.display = "column";
// allFieldDivs.style.marginRight = "20px";
//timerDivs.children.style.margin = "2px";


startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    this.defaultDate = new Date();
    if (selectedDates[0] < this.defaultDate) {
      startButton.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
      console.log(selectedDates[0]);
      countdownData = selectedDates[0];
      Notiflix.Notify.success('You have successfully chosen a date from the future');
    }
  },
};

flatpickr(dateInput, options);

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

function addLeadingZero(value) {
    if (value.toString().length < 2) {
      return '0' + value;
    } else {
      return value;
    }
}

startButton.addEventListener('click', () => {
  timer = setInterval(() => {
    const actualDate = new Date();
    const timeToCountdown = countdownData.getTime() - actualDate.getTime();
    const convertedTime = convertMs(timeToCountdown);
    if (countdownData.getTime() > actualDate.getTime()) {
      daysField.textContent = addLeadingZero(convertedTime.days);
      hoursField.textContent = addLeadingZero(convertedTime.hours);
      minutesField.textContent = addLeadingZero(convertedTime.minutes);
      secondsField.textContent = addLeadingZero(convertedTime.seconds);
    } else {
      clearInterval(timer);
      Notiflix.Notify.success('Countdown successfully finished!');
      startButton.disabled = true;
    }
  }, 1000);

});