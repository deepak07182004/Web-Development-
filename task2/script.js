let startTime, updatedTime, elapsedTime = 0;
let interval;
let running = false;
let lapNumber = 0;

const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);


lapBtn.addEventListener('click', recordLap);

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
    running = true;
    startStopBtn.textContent = 'Pause';
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

function stopStopwatch() {
    clearInterval(interval);
    running = false;
    startStopBtn.textContent = 'Start';
}

function resetStopwatch() {
    clearInterval(interval);
    elapsedTime = 0;
    running = false;
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    updateTime();
    lapsList.innerHTML = ''; 
    lapNumber = 0;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;

    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    hoursDisplay.textContent = padZero(hours);
    minutesDisplay.textContent = padZero(minutes);
    secondsDisplay.textContent = padZero(seconds);
    millisecondsDisplay.textContent = padZero(milliseconds);
}

function padZero(value) {
    return value.toString().padStart(2, '0');
}

function recordLap() {
    lapNumber++;
    const lapTime = `${padZero(hoursDisplay.textContent)}:${padZero(minutesDisplay.textContent)}:${padZero(secondsDisplay.textContent)}.${padZero(millisecondsDisplay.textContent)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}
