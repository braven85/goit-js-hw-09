const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.body;
let timer = null;

stopButton.disabled = true;

const bodyDiv = document.createElement('div');
bodyDiv.className = 'center-div';

startButton.before(bodyDiv);
bodyDiv.append(startButton);
bodyDiv.append(stopButton);

bodyDiv.style.display = "flex";
bodyDiv.style.justifyContent = "center";
bodyDiv.style.minHeight = "90vh";
bodyDiv.style.alignItems = "center";

startButton.style.fontSize = "50px";
startButton.style.textTransform = 'uppercase';
startButton.style.marginRight = "20px";
stopButton.style.fontSize = '50px';
stopButton.style.textTransform = 'uppercase';

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