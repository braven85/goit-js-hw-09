import Notiflix from 'notiflix';

const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amountValue = document.querySelector('input[name="amount"]');
const createPromiseButton = document.querySelector('button[type="submit"]');

const sendForm = data => {
  data.preventDefault();

  function validation(toValidate, valueToSet, notificationText) {
    if (toValidate < 0) {
      valueToSet.valueAsNumber = 0;
      return Notiflix.Notify.failure(`${notificationText} value can't be lower than 0!`);
    }
  }

  let delay = firstDelay.valueAsNumber;
  validation(delay, firstDelay, "First delay");
  let step = delayStep.valueAsNumber;
  validation(step, delayStep, "Delay");
  let amount = amountValue.valueAsNumber;
  validation(amount, amountValue, "Amount");

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
        } else {
          reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
        }
      }, delay);
    });
  }

  for (let i = 1; i <= amount; i++) {
    let position = i;
    let delayInLoop = delay;

    createPromise(position, delay)
      .then(() => {
        console.log(`✅ Fulfilled promise ${position - 1} in ${delayInLoop}ms`);
      })
      .catch(() => {
        console.log(`❌ Rejected promise ${position - 1} in ${delayInLoop}ms`);
      });
    delay += step;
    position++;
  }
};

createPromiseButton.addEventListener('click', sendForm);
