const wordsByLength = {
  4: ["book", "star", "moon", "fish", "gold", "leaf", "wolf", "iron"],
  5: ["cloud", "ocean", "lemon", "tiger", "chair", "storm", "brave", "flame"],
  6: ["planet", "guitar", "puzzle", "coffee", "python", "wizard", "castle", "orange"],
  7: ["blanket", "diamond", "journey", "shampoo", "penguin", "kitchen", "harmony", "freedom"]
};

let currentWord = "";
let score = 0;
let streak = 0;
let solving = false;

function buildSky() {
  const stars = document.getElementById("stars");
  for (let i = 0; i < 60; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 45 + "%";
    star.style.setProperty("--twinkle", (2 + Math.random() * 3).toFixed(2) + "s");
    star.style.setProperty("--delay", (-Math.random() * 5).toFixed(2) + "s");
    stars.appendChild(star);
  }

  // Far clouds are small, faint and slow; near clouds are big and faster
  const clouds = document.getElementById("clouds");
  for (let i = 0; i < 9; i++) {
    const depth = Math.random();
    const dur = 90 - depth * 50;
    const cloud = document.createElement("div");
    cloud.className = "cloud";
    const width = Math.round(90 + depth * 170);
    cloud.style.setProperty("--w", `min(${width}px, ${width / 10}vw)`);
    cloud.style.setProperty("--top", (5 + Math.random() * 70).toFixed(1) + "%");
    cloud.style.setProperty("--dur", dur.toFixed(1) + "s");
    cloud.style.setProperty("--delay", (-Math.random() * dur).toFixed(1) + "s");
    cloud.style.setProperty("--opacity", (0.35 + depth * 0.5).toFixed(2));
    cloud.style.setProperty("--blur", (3 - depth * 2.5).toFixed(1) + "px");
    clouds.appendChild(cloud);
  }
}

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
  scrambled.split("").forEach((letter, i) => {
    const tile = document.createElement("div");
    tile.className = "letter-tile";
    tile.style.setProperty("--i", i);
    tile.textContent = letter;
    container.appendChild(tile);
  });
}

function newRound() {
  const length = document.getElementById("length-select").value;
  const pool = wordsByLength[length];
  solving = false;
  currentWord = pool[Math.floor(Math.random() * pool.length)];
  renderTiles(scrambleWord(currentWord));
  document.getElementById("guess").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("guess").focus();
}

function checkGuess() {
  if (solving) return;
  const guess = document.getElementById("guess").value.trim().toLowerCase();
  const message = document.getElementById("message");
  if (guess === currentWord) {
    solving = true;
    score++;
    streak++;
    document.getElementById("score").textContent = score;
    document.getElementById("streak").textContent = streak;
    message.textContent = streak >= 3 ? `Correct! ${streak} in a row! 🔥` : "Correct! 🎉";
    message.style.color = "#7bed9f";
    // Show the answer on the tiles, then celebrate
    document.querySelectorAll(".letter-tile").forEach((tile, i) => {
      tile.textContent = currentWord[i];
      tile.classList.add("solved");
    });
    setTimeout(newRound, 1300);
  } else {
    streak = 0;
    document.getElementById("streak").textContent = streak;
    message.textContent = "Try again!";
    message.style.color = "#ff6b6b";
    const card = document.getElementById("card");
    card.classList.remove("shake");
    void card.offsetWidth; // restart the animation
    card.classList.add("shake");
  }
}

document.getElementById("submit-btn").addEventListener("click", checkGuess);
document.getElementById("skip-btn").addEventListener("click", () => {
  streak = 0;
  document.getElementById("streak").textContent = streak;
  newRound();
});
document.getElementById("length-select").addEventListener("change", newRound);
document.getElementById("guess").addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
});

buildSky();
newRound();
