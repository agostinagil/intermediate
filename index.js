const d = document;

const $playerBoard = d.querySelector(".player-cards"),
  $dealerBoard = d.querySelector(".dealer-cards"),
  $playBtn = d.querySelector(".play"),
  $intermediateBtn = d.querySelector(".intermediate"),
  $notIntermediateBtn = d.querySelector(".notIntermediate"),
  $newGameBtn = d.querySelector(".newGame"),
  $results = d.querySelector(".results");

d.addEventListener("click", (e) => {
  if (e.target == $playBtn) {
    createDeck();
    shuffle();
    startGame();
    $playBtn.classList.add("hidden");
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
  let hiddenCard = deck.pop();
  let $backCard = d.createElement("img");
  $backCard.src = `./cards/BACK.png`;
  $backCard.classList.add("card");
  $dealerBoard.append($backCard);
  //   console.log("hidden card", hiddenCard);

  for (let i = 0; i < 2; i++) {
    let card = deck.pop();
    let data = card.split("-");
    let value = data[0].trim();
    console.log(`CARD: ${card}, DATA: ${data}, VALUE: ${value}`);
    playerCards.push(value);
    let $playerCard = d.createElement("img");
    $playerCard.src = `./cards/${card}.png`;
    $playerCard.classList.add("card");
    $playerBoard.append($playerCard);
    console.log(playerCards);
  }

  $intermediateBtn.disabled = false;
  $notIntermediateBtn.disabled = false;
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

/*
   Por hacer: 
   - función para ver si hiddenCard está entre las cartas del jugador. 
   - si el jugador elige que será intermedia o no, se ejecute la función que determina si la carta es intermedia o no y que muestre el mensaje correspondiente.
   - una vez ejecutada la función, que la carta "BACK" se oculte y que se muestre la hiddenCard. 
   - que se muestre el mensaje correspondiente

   Idea función:
   - ver método que extraiga los valores del array playerCards y que los ordene de mayor a menor. 
   - ver cómo determinar si el valor de hiddenCard está entre los dos valores del array.
   - tiene que devolver el mensaje correspondiente.

*/
