import Notiflix from 'notiflix';

const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amountValue = document.querySelector('input[name="amount"]');
const createPromiseButton = document.querySelector('button[type="submit"]');

const sendForm = data => {
  data.preventDefault();

  let delay = firstDelay.valueAsNumber;
  let step = delayStep.valueAsNumber;
  let amount = amountValue.valueAsNumber;

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
