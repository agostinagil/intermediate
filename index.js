const d = document;

const $playerBoard = d.querySelector(".player-cards"),
  $dealerBoard = d.querySelector(".dealer-cards"),
  $playBtn = d.querySelector(".play"),
  $inBetweenBtn = d.querySelector(".inBetween"),
  $notInBetweenBtn = d.querySelector(".notInBetween"),
  $newGameBtn = d.querySelector(".newGame"),
  $results = d.querySelector(".results"),
  $backCard = d.createElement("img"),
  $thirdCard = d.createElement("img");

$backCard.src = `./cards/BACK.png`;
$backCard.classList.add("card", "hidden");
$dealerBoard.append($backCard);

d.addEventListener("click", (e) => {
  if (e.target == $playBtn) {
    createDeck();
    shuffle();
    startGame();
    $backCard.classList.remove("hidden");
    $playBtn.classList.add("hidden");
  }
  if (e.target == $inBetweenBtn) {
    $backCard.classList.add("hidden");
    $thirdCard.classList.remove("hidden");
    between(e);
    $inBetweenBtn.disabled = true;
    $notInBetweenBtn.disabled = true;
  }

  if (e.target == $notInBetweenBtn) {
    $backCard.classList.add("hidden");
    $thirdCard.classList.remove("hidden");
    between(e);
    $inBetweenBtn.disabled = true;
    $notInBetweenBtn.disabled = true;
  }

  if (e.target == $newGameBtn) {
    console.clear();
    createDeck();
    shuffle();
    $thirdCard.classList.add("hidden");
    $playerBoard.textContent = "";
    $results.textContent = "";
    playerCards = [];

    $inBetweenBtn.disabled = true;
    $notInBetweenBtn.disabled = true;

    setTimeout(() => {
      $backCard.classList.remove("hidden");

      startGame();
    }, 1000);
  }
});

let deck = [],
  playerCards = [];

const createDeck = () => {
  const suits = ["H", "D", "S", "C"],
    values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      deck.push(`${values[x]}-${suits[i]}`);
    }
  }
};

const shuffle = () => {
  for (let i = 0; i < deck.length; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = deck[i];
    deck[i] = deck[location1];
    deck[location1] = location2;
  }
};

const startGame = () => {
  for (let i = 0; i < 2; i++) {
    let card = deck.pop();
    let value = getValue(card);
    playerCards.push(value);
    let $playerCard = d.createElement("img");
    $playerCard.src = `./cards/${card}.png`;
    $playerCard.classList.add("card");
    $playerBoard.append($playerCard);
    // console.log(playerCards);
  }

  $inBetweenBtn.disabled = false;
  $notInBetweenBtn.disabled = false;
};

const getValue = (card) => {
  let data = card.split("-");
  let value = data[0].trim();

  if (isNaN(value)) {
    return 1;
  } else {
    return parseInt(value, 10);
  }
};

const between = (e) => {
  let hiddenCard = deck.pop();
  // $thirdCard = d.createElement("img");
  $thirdCard.src = `./cards/${hiddenCard}.png`;
  $thirdCard.classList.add("card");
  $dealerBoard.append($thirdCard);
  let data = hiddenCard.split("-"),
    value = data[0].trim(),
    checkedValue = getValue(value);
  playerCards.sort((a, b) => a - b);

  if (e.target == $inBetweenBtn) {
    if (playerCards.includes(checkedValue)) {
      $results.textContent = `El valor (${checkedValue}) de la tercer carta es igual a un valor de tus cartas. Perdiste`;
      console.log("no es intermedio");
    } else if (checkedValue > playerCards[0] && checkedValue < playerCards[1]) {
      $results.textContent = `El valor (${checkedValue}) de la tercer carta es intermedio entre tus dos cartas. Felicitaciones!`;
      console.log(`La carta ${checkedValue} es intermedio`);
    } else {
      $results.textContent = `El valor (${checkedValue}) de la tercer carta no es intermedio entre tus dos cartas. Perdiste!`;
    }
  }
  if (e.target == $notInBetweenBtn) {
    if (playerCards.includes(checkedValue)) {
      $results.textContent = `El valor (${checkedValue}) de la tercer carta es igual a un valor de tus cartas. Ganaste`;
      console.log("no es intermedio");
    } else if (checkedValue > playerCards[0] && checkedValue < playerCards[1]) {
      $results.textContent = `El valor (${checkedValue}) de la tercer carta es intermedio entre tus dos cartas. Perdiste!`;
      console.log(`La carta ${checkedValue} es intermedio`);
    } else {
      $results.textContent = `El valor (${checkedValue}) de la tercer carta no es intermedio entre tus dos cartas. Ganaste!`;
    }
  }
};

/*const inBetween = () => {
  let hiddenCard = deck.pop();
  let $thirdCard = d.createElement("img");
  $thirdCard.src = `./cards/${hiddenCard}.png`;
  $thirdCard.classList.add("card");
  $dealerBoard.append($thirdCard);
  let data = hiddenCard.split("-");
  let value = data[0].trim();
  let checkedValue = getValue(value);
  playerCards.sort((a, b) => a - b);
  console.log(playerCards);

  let num = parseInt(checkedValue);
  console.log(num);

  if (playerCards.includes(checkedValue)) {
    $results.textContent = `El valor (${checkedValue}) de la tercer carta es igual a un valor de tus cartas. Perdiste`;
    console.log("no es intermedio");
  } else if (num > playerCards[0] && num < playerCards[1]) {
    $results.textContent = `El valor (${checkedValue}) de la tercer carta es intermedio entre tus dos cartas. Felicitaciones!`;
    console.log(`La carta ${num} es intermedio`);
  } else {
    $results.textContent = `El valor (${checkedValue}) de la tercer carta no es intermedio entre tus dos cartas. Perdiste!`;
  }
}; */

/*const notInBetween = () => {
  let hiddenCard = deck.pop();
  let $thirdCard = d.createElement("img");
  $thirdCard.src = `./cards/${hiddenCard}.png`;
  $thirdCard.classList.add("card");
  $dealerBoard.append($thirdCard);
  let data = hiddenCard.split("-");
  let value = data[0].trim();
  let checkedValue = getValue(value);
  playerCards.sort((a, b) => a - b);
  console.log(playerCards);

  let num = parseInt(checkedValue);

  if (playerCards.includes(checkedValue)) {
    $results.textContent = `El valor (${checkedValue}) de la tercer carta es igual a un valor de tus cartas. Ganaste`;
    console.log("no es intermedio");
  } else if (num > playerCards[0] && num < playerCards[1]) {
    $results.textContent = `El valor (${checkedValue}) de la tercer carta es intermedio entre tus dos cartas. Perdiste!`;
    console.log(`La carta ${num} es intermedio`);
  } else {
    $results.textContent = `El valor (${checkedValue}) de la tercer carta no es intermedio entre tus dos cartas. Ganaste!`;
  }
};*/
