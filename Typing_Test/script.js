const textDisplay = document.getElementById("text-display");
const input = document.getElementById("input");

const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

let timer = 60;
let interval = null;
let started = false;

const texts = [
    "Typing speed is an important skill for programmers and students.",
    "Practice daily to improve your typing accuracy and speed.",
    "JavaScript makes web applications interactive and powerful.",
    "Consistency is the key to mastering any skill in life."
];

// random text load
function loadText() {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    textDisplay.innerHTML = "";

    randomText.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        textDisplay.appendChild(span);
    });

    input.value = "";
}
loadText();

// typing event
input.addEventListener("input", () => {
    if (!started) {
        startTimer();
        started = true;
    }

    const typed = input.value.split("");
    const spans = textDisplay.querySelectorAll("span");

    let correct = 0;

    spans.forEach((span, index) => {
        const char = typed[index];

        if (char == null) {
            span.classList.remove("correct", "wrong", "current");
        } else if (char === span.innerText) {
            span.classList.add("correct");
            span.classList.remove("wrong");
            correct++;
        } else {
            span.classList.add("wrong");
            span.classList.remove("correct");
        }

        if (index === typed.length) {
            span.classList.add("current");
        } else {
            span.classList.remove("current");
        }
    });

    // accuracy
    let accuracy = (correct / typed.length) * 100 || 100;
    accuracyEl.innerText = accuracy.toFixed(0);

    // WPM (real)
    let words = typed.length / 5;
    let wpm = Math.round(words / ((60 - timer) / 60));
    wpmEl.innerText = wpm || 0;
});

// timer
function startTimer() {
    interval = setInterval(() => {
        timer--;
        timeEl.innerText = timer;

        if (timer === 0) {
            clearInterval(interval);
            input.disabled = true;
        }
    }, 1000);
}

// restart
function restart() {
    clearInterval(interval);
    timer = 60;
    started = false;
    input.disabled = false;
    timeEl.innerText = timer;
    wpmEl.innerText = 0;
    accuracyEl.innerText = 100;
    loadText();
}