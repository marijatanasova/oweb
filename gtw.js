
const words = ["apple", "mountain", "flower", "exhilarating", "amazing", "melancholy", "tower", "pencil", "entertaining", "glasses", "carpet", "elephant", "cherry", "keenness", "remote", "calendar", "thunderstorm", "jacket", "notebook", "umbrella"];

var WordSel = "";
var WordGuess = [];
var GuessesLeft = 5;

// Funkcija za pocetok na nova igra
function newGame() {
    WordSel = RandomWord();
    WordGuess = Array.from(WordSel.slice(0, 3).padEnd(8, "_"));
    GuessesLeft = 5;

    WordDisplay();
    GuessCount();
    PopupHide();
}

// Funkcija za biranje zbor so dolzina od 8 bukvi na slucaen nacin
function RandomWord() {
    const filteredWords = words.filter(word => word.length == 8);
    const index = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[index];
}

// Funkcija za promenite na zborot sto se pogoduva
function WordDisplay() {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.textContent = WordGuess.join(" ");
}

// Funkcija za obnovuvanje na brojot na preostanati obidi za pogoduvanje
function GuessCount() {
    const guessCount = document.getElementById("guess-count");
    guessCount.textContent = `Guesses left:`;
}

// Funkcija za proverka na pogodeniot zbor
function checkGuess() {
    const guessInput = document.getElementById("guess-input");
    const userGuess = guessInput.value.toLowerCase();

    if (userGuess.length !== 1 || !/[a-z]/.test(userGuess)) {
        window.alert("Enter a single letter.");
        return;
    }

    if (WordSel.includes(userGuess)) {
        for (let i = 0; i < WordSel.length; i++) {
            if (WordSel[i] === userGuess) {
                WordGuess[i] = userGuess;
            }
        }
    } else {
        GuessesLeft--;
    }

    WordDisplay();
    GuessCount();

    if (WordGuess.join("") === WordSel) {
        PopupDisplay(true);
    } else if (GuessesLeft === 0) {
        PopupDisplay(false);
    }

    guessInput.value = "";
}

// Funkcija da pokazuva rezultat vo popup prozorec
function PopupDisplay(isSuccessful) {
    const resultPopup = document.getElementById("result-popup");
    const overlay = document.createElement("div");
    document.body.appendChild(overlay);

    resultPopup.textContent = isSuccessful ? "Congratulations, you guessed the word!" : "Sorry, you ran out of guesses. The word was: " + WordSel;
    resultPopup.style.display = "block";
}

// Funkcija za da se iskluci popup
function PopupHide() {
    const resultPopup = document.getElementById("result-popup");
    const overlay = document.querySelector(".overlay");

    resultPopup.style.display = "none";
    overlay.style.display = "none";
}

// Inicijalizacija na nova igra koga ke se napravi load na stranata
document.addEventListener("DOMContentLoaded", newGame);
