const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const modeToggleBtn = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');
let timerInterval;
let selectedTime = 0;
let isRunning = false;

const times = {
  '2-mark': 2 * 60,
  '4-mark': 5 * 60,
  '6-mark': 8 * 60,
  '8-mark': 15 * 60,
};

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
}

function startTimer(seconds) {
  clearInterval(timerInterval);
  let remainingTime = seconds;

  function tick() {
    updateTimerDisplay(remainingTime);
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      alert('Time’s up!');
      resetStartButton();
    }
    remainingTime--;
  }

  tick();
  timerInterval = setInterval(tick, 1000);
}

function toggleStartButton() {
  if (!isRunning) {
    if (selectedTime > 0) {
      startTimer(selectedTime);
      startBtn.classList.add('started');
      startBtn.textContent = 'Pause';
      isRunning = true;
    } else {
      alert('Please select a marker.');
    }
  } else {
    clearInterval(timerInterval);
    startBtn.classList.remove('started');
    startBtn.classList.add('resume');
    startBtn.textContent = 'Resume';
    isRunning = false;
  }
}

function resetStartButton() {
  startBtn.classList.remove('started', 'resume');
  startBtn.textContent = 'Start';
  isRunning = false;
}

modeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  if (document.body.classList.contains('light-mode')) {
    modeIcon.src = 'https://img.icons8.com/ios-filled/100/do-not-disturb-2.png'; // darkmode
  } else {
    modeIcon.src =
      'https://img.icons8.com/external-flat-papa-vector/78/external-Light-Mode-interface-flat-papa-vector.png'; // lightmode icon
  }
});

document.querySelectorAll('.option-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const timeKey = button.id;
    selectedTime = times[timeKey];
    updateTimerDisplay(selectedTime);
    resetStartButton();
  });
});

startBtn.addEventListener('click', toggleStartButton);

restartBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  selectedTime = 0;
  updateTimerDisplay(0);
  resetStartButton();
});
