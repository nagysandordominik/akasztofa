const wordElement = document.querySelector('#word');
const attemptElement = document.querySelector('#attempts-remaining');
const revealWordElement = document.querySelector('.reveal-word');
const resetElement = document.querySelector('.reset');
const hangmanElement = document.querySelector('#hamgman-img');
const temaSelector = document.querySelector('tema');
// const wordsList = ["alma", "kutya", "szeretet", "ablak", "piac", "virág", "kert", "élet", "szív", "kábel", "iskola", "ajtó", "program", "társadalom", "könyv", "televízió", "gyermek", "épület", "ember", "ország", "papír", "lámpa", "folyó", "hegy", "villa", "lakás", "adatbázis", "zsákmány", "utca", "vasút", "lány", "kémény", "gondolat", "folyamat", "híd", "számítógép", "mobiltelefon", "család", "barát", "állomány", "ruha", "tábla", "szótár", "drog", "magyar", "építészet", "játék", "káposzta", "kormány", "város", "természet", "nap", "hold", "csillag", "cukor", "hely", "kukac", "fikusz", "égbolt", "házasság", "közösség", "gazdaság", "tudomány", "vízvezeték", "bojler", "szél", "tükör", "föld", "temető", "szakma", "szabadidő", "napfény", "világítás", "kommunikáció", "szerencse", "egészség", "mozgás", "képesség", "monitor", "gyengeség", "kocka", "valóság", "álmok", "győzelem", "harc", "békesség", "szabadság", "remény", "siker", "boldogság", "szomorúság", "félelem", "szerelem", "boldogtalanság", "vágy", "öröm"];
const tengerSzavak = ["hullám", "part", "hajó", "vitorla", "hal", "búvár", "bóják", "barna alga", "szikla", "homok", "dagály", "apály", "koral", "hajóroncs", "szörf", "gömbhal", "strand", "felfedezés", "búvárruházat", "tengeralattjáró", "víztükör", "óceán", "halászhajó", "tengerfenék", "búvárkodás", "tengerpart", "sótartalom", "tengerészet", "lávakövek", "lávafolyam", "szörfdeszka", "horgászat", "sósvíz", "szörfözés", "korallzátony", "hullámtörés"];
const vilagurSzavak = ["csillag", "bolygó", "űrhajó", "űrállomás", "Szaturnusz", "űrkutatás", "űrközpont", "űrturizmus", "űrtávcső", "űrkutató", "űrkapszula", "űrkolonizáció", "űrlabor", "űrszemét", "űrsétány", "űrszonda", "űrfelszín", "űrjárás", "űrfelvétel", "rakéta", "űrszonda", "lökésfront", "légkör", "űrbázis", "világegyetem", "Mars", "Tejút", "gravitáció", "űrtechnológia", "vákuum", "űrutazás", "atmoszféra", "háttérsugárzás", "légellenállás", "űrlift", "űrhálózat", "űrkutató", "termoszféra", "asztronauta", "űrkaland", "műhold", "űrkutatás", "űrlégkör", "űrfelszerelés", "űrszonda", "üstökös", "űrközpont", "hellopauza", "univerzum"];
const orszagSzavak = ["Ausztrália", "Brazília", "Egyiptom", "Franciaország", "India", "Japán", "Kanada", "Mexikó", "Németország", "Olaszország", "Spanyolország", "Svédország", "Törökország", "Argentína", "Belgium", "Chile", "Dánia", "Görögország", "Hollandia", "Norvégia", "Portugália", "Svájc", "Ukrajna", "Ausztria", "Bulgária", "Csehország", "Finnország", "Írország", "Kolumbia", "Lengyelország", "Románia", "Szerbia", "Thaiföld", "Vietnám", "Afganisztán", "Bahrein", "Kuvait", "Mongólia", "Pakisztán", "Szíria", "Katar", "Irak", "Jemen", "Omán", "Libanon", "UAE", "Etiópia", "Kenya", "Nigéria", "Szenegál", "Ecuador", "Peru", "Uruguay", "Panama", "Venezuela", "Fülöp-szigetek", "Indonézia", "Malajzia", "Szingapúr", "Tajvan", "Banglades", "Maldív-szigetek", "Nepál", "Szudán", "Zambia"];
let selectedArray = [];

let choosedWord = '';
let chances = 6;

function createAlphabetButtons() {
    const alphabet = "AÁBCDZEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ";
    const lettersContainer = document.querySelector('.alphabet-ctn');

    for (const letter of alphabet) {
        createLetterStyle(lettersContainer, letter);
    }

}

function createLetterStyle(lettersContainer, letter) {
    const button = document.createElement('button');
    button.classList.add('letter');
    button.textContent = letter;
    lettersContainer.appendChild(button);

    button.addEventListener('click', function () {
        guessLetter(letter, button);
    });
}

function checkTema() {
    if (window.location.href.includes('jatek1.html')) {
    selectedArray = tengerSzavak;
    } else if (window.location.href.includes('jatek2.html')) {
        selectedArray = vilagurSzavak;
    } else if (window.location.href.includes('jatek3.html')) {
        selectedArray = orszagSzavak;
    }
}
checkTema();

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * selectedArray.length);
    console.log(selectedArray[randomIndex]);
    return selectedArray[randomIndex];

}

function displayWord() {
    const randomWord = getRandomWord();
    const wordLength = randomWord.length;
    let formattedWord = "";

    choosedWord = randomWord;
    for (let i = 0; i < wordLength; i++) {
        formattedWord += "_ ";
    }
    attemptElement.innerHTML = chances;
    wordElement.innerHTML = formattedWord.trim();
}

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
    }


    button.classList.add('btn-clicked');
}

function checkLetterInWord(randomWord, wordArray, lowerCaseLetter) {
    for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === lowerCaseLetter) {
            wordArray[i] = lowerCaseLetter;
        }

    }


    wordElement.textContent = wordArray.join(' ');

    if (wordElement.textContent.replace(/\s/g, '') === randomWord) {
        revealWordElement.innerHTML = `NYERTÉL`
        revealWordElement.classList.add('active');
        stopAlphabetEvent();
    }

}

function stopAlphabetEvent() {
    const alphabetButtons = document.querySelectorAll('.letter');

    alphabetButtons.forEach(function (button) {
        button.disabled = true;
    });
}

function updateHangmanImage(chances) {
    const hangmanImg = document.querySelector('#hangman-img');
    hangmanImg.src = `img/${6 - chances}.png`;
}

function endOfGame(randomWord, chances) {

    if (chances === 0) {
        revealWordElement.innerHTML = `VESZTETTÉL! A helyes szó: ${randomWord}`
        revealWordElement.classList.add('active');
        stopAlphabetEvent();
    }

}

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
}

const menuElement = document.querySelector('.menu');

function visszaMenube() {
    window.location.href = 'index.html';
}

menuElement.addEventListener('click', visszaMenube);

window.addEventListener('DOMContentLoaded', function () {
    createAlphabetButtons();
    displayWord();
});

resetElement.addEventListener('click', resetGame);

