import { Notify } from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();

  const firstDelay = Number(e.currentTarget.delay.value);
  const stepDelay = Number(e.currentTarget.step.value);
  const amount = Number(e.currentTarget.amount.value);

  let premixExecutionDelay = firstDelay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, premixExecutionDelay).then(onSuccsess).catch(onError);

    premixExecutionDelay = firstDelay + stepDelay * i;
  }
  e.currentTarget.reset();
}

function onSuccsess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
