const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.body;
let timer = null;

stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  timer = setInterval(() => {
    let backgroundColor = getRandomHexColor();
    body.style.backgroundColor = backgroundColor;
  }, 1000);
});

stopButton.addEventListener('click', () => {
  stopButton.disabled = true;
  startButton.disabled = false;
  clearInterval(timer);
})