const bodyEl = document.body;
const btnColorStart = document.querySelector('[data-start]');
const btnColorStop = document.querySelector('[data-stop]');
let identifier = 0;

btnColorStart.addEventListener('click', colorChangeStart);
btnColorStop.addEventListener('click', colorChangeStop);
btnRevers(false);

function btnRevers(stan) {
  btnColorStart.disabled = stan;
  btnColorStop.disabled = !stan;
}

function colorChangeStart() {
  identifier = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, 2000);

  btnRevers(true);
}

function colorChangeStop() {
  clearInterval(identifier);

  btnRevers(false);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
