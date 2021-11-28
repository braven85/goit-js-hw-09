import Notiflix from 'notiflix';

const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amountValue = document.querySelector('input[name="amount"]');
const createPromiseButton = document.querySelector('button[type="submit"]');

const sendForm = data => {
  data.preventDefault();

  let delay = firstDelay.valueAsNumber;
  if (delay < 0) {
    firstDelay.valueAsNumber = 0;
    return Notiflix.Notify.failure("First delay value can't be lower than 0!");
  }
  let step = delayStep.valueAsNumber;
  if (step < 0) {
    delayStep.valueAsNumber = 0;
    return Notiflix.Notify.failure("Delay step value can't be lower than 0!");
  }
  let amount = amountValue.valueAsNumber;
  if (amount < 0) {
    amountValue.valueAsNumber = 0;
    return Notiflix.Notify.failure("Amount value can't be lower than 0!");
  }

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
