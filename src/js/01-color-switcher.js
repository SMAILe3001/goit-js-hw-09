const bodyEl = document.body;
const btnColorStart = document.querySelector('[data-start]');
const btnColorStop = document.querySelector('[data-stop]');
let identifier = 0;

btnColorStart.addEventListener('click', colorChangeStart);
btnColorStop.addEventListener('click', colorChangeStop);
btnColorStop.disabled = true;

function colorChangeStart() {
  identifier = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, 2000);

  btnColorStart.disabled = true;
  btnColorStop.disabled = false;
}

function colorChangeStop() {
  clearInterval(identifier);

  btnColorStop.disabled = true;
  btnColorStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
