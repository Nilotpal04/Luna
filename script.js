const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const heartsContainer = document.querySelector(".hearts-container");
const askGif = document.getElementById("askGif");

let yesScale = 1;

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💗";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 14 + Math.random() * 18 + "px";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 600);

function moveNo() {
  const padding = window.innerWidth < 600 ? 60 : 80;

  const yesRect = yesBtn.getBoundingClientRect();
  let x, y;
  let attempts = 0;

  do {
    x = Math.random() * (window.innerWidth - padding);
    y = Math.random() * (window.innerHeight - padding);
    attempts++;
  } while (
    // ❌ overlap detection
    x < yesRect.right &&
    x + noBtn.offsetWidth > yesRect.left &&
    y < yesRect.bottom &&
    y + noBtn.offsetHeight > yesRect.top &&
    attempts < 50
  );

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // grow Yes (slower on mobile)
  const growthFactor = window.innerWidth < 600 ? 0.08 : 0.12;
  yesScale += growthFactor;
  yesBtn.style.transform = `scale(${yesScale})`;

  // cute gif reaction
  askGif.classList.add("bounce");
  setTimeout(() => askGif.classList.remove("bounce"), 600);
}


noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("click", moveNo);

function heartBurst() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = yesBtn.getBoundingClientRect().left + "px";
    heart.style.top = yesBtn.getBoundingClientRect().top + "px";
    heart.style.position = "fixed";
    heart.style.animationDuration = "2s";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}

yesBtn.addEventListener("click", () => {
  yesBtn.disabled = true;
  startMusic();
  heartBurst();
  pingMe();

  setTimeout(() => {
    const container = document.querySelector(".container");

    container.innerHTML = `
      <div>
        <img src="./assets/yes.gif" style="width:180px; margin-bottom:20px;" />
        <h1 style="font-size:42px; color:#d6336c;">Yay 💖</h1>
        <p style="font-family:Inter,sans-serif; font-size:18px; margin-top:20px;">
          Luna, thank you for being my Valentine ✨<br>
          I’m really, really happy 💕
        </p>
      </div>
    `;
  }, 600);
});

function pingMe() {
  const form = document.getElementById("notifyForm");
  const data = new FormData(form);

  data.set("time", new Date().toLocaleString());

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      "Accept": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) {
        console.warn("Formspree failed", res.status);
      }
    })
    .catch(err => {
      console.error("Ping error", err);
    });
}

const growthFactor = window.innerWidth < 600 ? 0.08 : 0.12;
yesScale += growthFactor;

const bgMusic = document.getElementById("bgMusic");
let musicStarted = false;

function startMusic() {
  if (!musicStarted) {
    bgMusic.volume = 0.5; // soft volume
    bgMusic.play().catch(() => {});
    musicStarted = true;
  }
}
