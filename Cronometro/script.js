const timerEl = document.getElementById('timer');
const marksList = document.getElementById('marks-list');

let intervalId = 0;
let timer = 0;
let marks = [];

const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 60000) / 1000);
    const hundredths = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
}

const addMarkToList = (markIndex, markTime) => {
marksList.innerHTML += `<p>Marca ${markIndex + 1}: ${formatTime(markTime)}</p>`;
}

const markTime = () => {
    marks.push(timer);
    addMarkToList(marks.length - 1, timer);
}

const toggerlTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    clearInterval(intervalId);

    if (action == "start" || action == "continue"){
        intervalId = setInterval(() => {
            timer += 1;
            setTimer(timer);}, 10);
            button.setAttribute('action', 'pause');
            button.innerHTML = '<i class="fa-solid fa-pause"></i>'; 
    } else if (action == "stop") {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}
const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTimer(timer);
    marksList.innerHTML = '';
    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

const setTimer = (time) => {
    timerEl.innerHTML = formatTime(time);
}

document.getElementById('power').addEventListener('click', toggerlTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);