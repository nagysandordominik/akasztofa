const wordElement = document.querySelector('#word');
const attemptElement = document.querySelector('#attempts-remaining');
const revealWordElement = document.querySelector('.reveal-word');
const resetElement = document.querySelector('.reset');
const hangmanElement = document.querySelector('#hamgman-img');
const wordsList = [
    "alma", "kutya", "szeretet", "ablak", "kép", "virág",
    "kert", "élet", "szív", "szék", "iskola", "ajtó", "út", "társadalom", "könyv", "televízió", "gyermek", "épület", "ember", "ország", "papír", "lámpa",
    "folyó", "hegy", "villa", "lakás", "kávé", "óra", "utca", "vasút", "lány", "fiú", "gondolat", "folyamat", "híd", "számítógép", "mobiltelefon",
    "család", "barát", "ház", "ruha", "tábla", "szótár", "fű", "magyar", "építészet", "játék", "kéz", "kormány", "város", "természet", "nap", "hold",
    "csillag", "cukor", "hely", "kukac", "víz", "égbolt", "társ", "közösség", "gazdaság", "tudomány", "vízvezeték", "tűz", "szél", "hó", "föld", "idő", "szakma",
    "szabadidő", "napfény", "világítás", "kommunikáció", "szerencse", "egészség", "mozgás", "képesség", "erő", "gyengeség", "kocka", "valóság", "álmok",
    "győzelem", "harc", "békesség", "szabadság", "remény", "siker", "boldogság", "szomorúság", "félelem", "szerelem", "boldogtalanság", "vágy", "öröm"
];


let choosedWord = '';
let chances = 6;

function createAlphabetButtons() {
    const alphabet = "AÁBCDDZEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ";
    const lettersContainer = document.querySelector('.alphabet-ctn');

    for (const letter of alphabet) {
        createLetterStyle(lettersContainer, letter);
    };
};

function createLetterStyle(lettersContainer, letter) {
    const button = document.createElement('button');
    button.classList.add('letter');
    button.textContent = letter;
    lettersContainer.appendChild(button);

    button.addEventListener('click', function () {
        guessLetter(letter, button);
    });
};

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    return wordsList[randomIndex];
};

function displayWord() {
    const randomWord = getRandomWord();
    const wordLength = randomWord.length;
    let formattedWord = "";

    choosedWord = randomWord;

    for (let i = 0; i < wordLength; i++) {
        formattedWord += "_ ";
    };
    attemptElement.innerHTML = chances;
    wordElement.innerHTML = formattedWord.trim();
};

function guessLetter(letter, button) {
    const randomWord = choosedWord;
    const lowerCaseLetter = letter.toLocaleLowerCase();
    const formattedWord = wordElement.textContent;

    if (randomWord.includes(lowerCaseLetter)) {
        const wordArray = formattedWord.split(' ');
        checkLetterInWord(randomWord, wordArray, lowerCaseLetter);
    } else {
        chances -= 1;
        attemptElement.innerHTML = chances;
        button.disabled = true;
        updateHangmanImage(chances);
        endOfGame(randomWord, chances);
    };

    button.classList.add('btn-clicked');
};

function checkLetterInWord(randomWord, wordArray, lowerCaseLetter) {
    for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === lowerCaseLetter) {
            wordArray[i] = lowerCaseLetter;
        };
    };

    wordElement.textContent = wordArray.join(' ');

    if (wordElement.textContent.replace(/\s/g, '') === randomWord) {
        revealWordElement.innerHTML = `NYERTÉL`
        revealWordElement.classList.add('active');
        stopAlphabetEvent();
    };
};

function stopAlphabetEvent() {
    const alphabetButtons = document.querySelectorAll('.letter');

    alphabetButtons.forEach(function (button) {
        button.disabled = true;
    });
};

function updateHangmanImage(chances) {
    const hangmanImg = document.querySelector('#hangman-img');
    hangmanImg.src = `https://raw.githubusercontent.com/ruthinunes/hangman/main/images/${6 - chances}.png`;
};

function endOfGame(randomWord, chances) {

    if (chances == 0) {
        revealWordElement.innerHTML = `VESZTETTÉL! A helyes szó: ${randomWord}`
        revealWordElement.classList.add('active');
        stopAlphabetEvent();
    };
};

function resetGame() {
    const alphabetButtons = document.querySelectorAll('.letter');
    alphabetButtons.forEach(function (button) {
        button.disabled = false;
        button.classList.remove('btn-clicked');
    });
    choosedWord = '';
    chances = 6;
    wordElement.textContent = '';
    attemptElement.textContent = '';
    revealWordElement.classList.remove('active');
    revealWordElement.textContent = '';
    updateHangmanImage(chances);
    displayWord();
};

window.addEventListener('DOMContentLoaded', function () {
    createAlphabetButtons();
    displayWord();
});

resetElement.addEventListener('click', resetGame);