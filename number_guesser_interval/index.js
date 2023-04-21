const displayedGuess = document.getElementById("guess");
const displayedGuessCount = document.getElementById("guessCount");
const guesserContainer = document.getElementById("guesserContainer");
const intervalContainer = document.getElementById("intervalContainer");
const displayedInterval = document.getElementById("guessInterval")
const guesserButtons = guesserContainer.getElementsByTagName("button");

let minGuess = 0;
let maxGuess = 100;
let allIntervalList = [[minInterval,maxInterval]];
let isTheNumberGuessed = false;
let guessCount = 1;

guesserContainer.style.display = "none";

Guess();

function Guess() {
    guessedNumber = Math.round((minGuess + maxGuess) / 2);

    if (!checkGuess()) {
        displayedGuess.innerHTML = "Is your number : " + guessedNumber + "?";
        displayedGuessCount.innerHTML = "Number of try : " + guessCount;
    }
}

function guessedCorrect() {
    hideGuesserButtons();

    displayedGuess.innerHTML = "Your number was " + guessedNumber + "!";
    displayedGuessCount.innerHTML = "number guessed in " + guessCount + " try!";
}

function guessedBelow() {
    if (!(minGuess === guessedNumber)) {
        allIntervalList.push([minGuess, maxGuess]);
        maxGuess = guessedNumber - 1;
        guessCount++;
        Guess();
    }
}

function guessedAbove() {
    if (!(maxGuess === guessedNumber)) {
        allIntervalList.push([minGuess, maxGuess]);
        minGuess = guessedNumber + 1;
        guessCount++;
        Guess();
    }
}

function hideGuesserButtons() {
    for (i = 0; i < guesserButtons.length; i++) {
        guesserButtons[i].style.display = "none";
    }
}
function showGuesserButtons() {
    for (i = 0; i < guesserButtons.length; i++) {
        guesserButtons[i].style.visibility = "inherit";
    }
}

function previousGuess() {
    if (guessCount > 1) {
        minGuess = allInterval[guessCount - 1][0];
        maxGuess = allIntervalList[guessCount - 1][1];
        allIntervalList.splice(-1);
        guessCount--;
        Guess();
    }
}

function restart() {
    minGuess = 0;
    maxGuess = 100;
    allIntervalList = [[0, 100]];
    isTheNumberGuessed = false;
    guessCount = 1;
    intervalContainer.style.display = "block";
    showGuesserButtons();
    guesserContainer.style.display = "none";
    Guess();
}

function setInterval() {
    const minGuessInput = document.getElementById("minInterval");
    const maxGuessInput = document.getElementById("maxInterval");

    if (parseInt(minGuessInput.value) <= parseInt(maxGuessInput.value)) {
        let minInterval = parseInt(minGuessInput.value);
        let maxInterval = parseInt(maxGuessInput.value);
        minGuess = minInterval;
        maxGuess = maxInterval;
        displayedInterval.innerHTML = "The number to guess is between " + minInterval + " and " + maxInterval;
        intervalContainer.style.display = "none";
        guesserContainer.style.display = "block";
        Guess();
    }
}
function checkGuess() {
    if (minGuess === maxGuess || minGuess === guessedNumber && maxGuess === guessedNumber) {
        console.log(maxGuess, minGuess);
        guessedCorrect();
        return true;
    }
    else {
        return false;
    }
}