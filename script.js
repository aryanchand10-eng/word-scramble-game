const wordsByLength = {
  4: ["book", "star", "moon", "fish", "gold", "leaf", "wolf", "iron"],
  5: ["planet", "guitar".slice(0,5), "coffee".slice(0,5), "wizard".slice(0,5), "chair", "storm", "brave", "flame"],
  6: ["planet", "guitar", "puzzle", "coffee", "python", "wizard", "castle", "orange"],
  7: ["blanket", "diamond", "journey", "shampoo", "penguin", "kitchen", "harmony", "freedom"]
};

let currentWord = "";
let score = 0;

function scrambleWord(word) {
  let letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  const scrambled = letters.join("");
  return scrambled === word ? scrambleWord(word) : scrambled;
}

function renderTiles(scrambled) {
  const container = document.getElementById("scrambled");
  container.innerHTML = "";
  scrambled.split("").forEach(letter => {
    const tile = document.createElement("div");
    tile.className = "letter-tile";
    tile.textContent = letter;
    container.appendChild(tile);
  });
}

function newRound() {
  const length = document.getElementById("length-select").value;
  const pool = wordsByLength[length];
  currentWord = pool[Math.floor(Math.random() * pool.length)];
  renderTiles(scrambleWord(currentWord));
  document.getElementById("guess").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("guess").focus();
}

function checkGuess() {
  const guess = document.getElementById("guess").value.trim().toLowerCase();
  const message = document.getElementById("message");
  if (guess === currentWord) {
    score++;
    document.getElementById("score").textContent = score;
    message.textContent = "Correct! 🎉";
    message.style.color = "#7bed9f";
    setTimeout(newRound, 900);
  } else {
    message.textContent = "Try again!";
    message.style.color = "#ff6b6b";
  }
}

document.getElementById("submit-btn").addEventListener("click", checkGuess);
document.getElementById("skip-btn").addEventListener("click", newRound);
document.getElementById("length-select").addEventListener("change", newRound);
document.getElementById("guess").addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
});

newRound();
