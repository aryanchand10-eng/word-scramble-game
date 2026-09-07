const words = ["planet", "guitar", "puzzle", "coffee", "python", "wizard", "castle", "orange"];
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

function newRound() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  document.getElementById("scrambled").textContent = scrambleWord(currentWord);
  document.getElementById("guess").value = "";
  document.getElementById("message").textContent = "";
}

function checkGuess() {
  const guess = document.getElementById("guess").value.trim().toLowerCase();
  const message = document.getElementById("message");
  if (guess === currentWord) {
    score++;
    document.getElementById("score").textContent = score;
    message.textContent = "Correct!";
    message.style.color = "#7bed9f";
    setTimeout(newRound, 1000);
  } else {
    message.textContent = "Try again!";
    message.style.color = "#ff6b6b";
  }
}

document.getElementById("submit-btn").addEventListener("click", checkGuess);
document.getElementById("skip-btn").addEventListener("click", newRound);
document.getElementById("guess").addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
});

newRound();
