import { Notify } from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });

  promise
    .then(() => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(() => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

function onFormSubmit(e) {
  e.preventDefault();

  const firstDelay = Number(formEl.querySelector('input[name="delay"]').value);
  const stepDelay = Number(formEl.querySelector('input[name="step"]').value);
  const amount = Number(formEl.querySelector('input[name="amount"]').value);
  let premixExecutionDelay = firstDelay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, premixExecutionDelay);
    premixExecutionDelay = firstDelay + stepDelay * i;
  }
  formEl.reset();
}
