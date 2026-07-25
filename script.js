// ======================================================
// ELEMENTOS
// ======================================================

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const popup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");

const heartsContainer = document.getElementById("floating-hearts");

// ======================================================
// BOTÃO "NÃO"
// ======================================================

let escapes = 0;

function moveButton() {
  const margin = 20;

  const maxX = window.innerWidth - noButton.offsetWidth - margin;

  const maxY = window.innerHeight - noButton.offsetHeight - margin;

  const x = Math.random() * maxX;

  const y = Math.random() * maxY;

  noButton.style.position = "fixed";

  noButton.style.left = `${x}px`;

  noButton.style.top = `${y}px`;

  escapes++;

  if (escapes > 12) {
    noButton.textContent = "Nunca 😝";
  }
}

noButton.addEventListener("mouseenter", moveButton);

noButton.addEventListener("touchstart", (e) => {
  e.preventDefault();

  moveButton();
});

// ======================================================
// BOTÃO SIM
// ======================================================

yesButton.addEventListener("click", () => {
  popup.classList.remove("hidden");

  createExplosion();
});

// ======================================================
// FECHAR POPUP
// ======================================================

closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});

// ======================================================
// CORAÇÕES FLUTUANTES
// ======================================================

function createHeart() {
  const heart = document.createElement("div");

  heart.className = "heart";

  heart.innerHTML = "❤";

  const size = Math.random() * 20 + 15;

  heart.style.fontSize = `${size}px`;

  heart.style.left = Math.random() * 100 + "%";

  heart.style.animationDuration = Math.random() * 4 + 4 + "s";

  heart.style.opacity = Math.random();

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

setInterval(createHeart, 500);

// ======================================================
// EXPLOSÃO DE CORAÇÕES
// ======================================================

function createExplosion() {
  for (let i = 0; i < 80; i++) {
    const heart = document.createElement("div");

    heart.innerHTML = "❤";

    heart.style.position = "fixed";

    heart.style.left = "50%";
    heart.style.top = "50%";

    heart.style.pointerEvents = "none";

    heart.style.fontSize = Math.random() * 25 + 18 + "px";

    heart.style.color = "#ff6ca8";

    const angle = Math.random() * Math.PI * 2;

    const distance = Math.random() * 350 + 80;

    const x = Math.cos(angle) * distance;

    const y = Math.sin(angle) * distance;

    heart.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(0)",

          opacity: 1,
        },
        {
          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.6)`,

          opacity: 0,
        },
      ],
      {
        duration: 1800,
        easing: "ease-out",
      },
    );

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1800);
  }
}

// ======================================================
// REAJUSTA CASO REDIMENSIONE A TELA
// ======================================================

window.addEventListener("resize", () => {
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.position = "relative";
});

// ======================================================
// EFEITO DE ENTRADA
// ======================================================

window.addEventListener("load", () => {
  document.body.animate(
    [
      {
        opacity: 0,
        transform: "scale(.98)",
      },

      {
        opacity: 1,
        transform: "scale(1)",
      },
    ],

    {
      duration: 800,
      easing: "ease-out",
    },
  );
});
