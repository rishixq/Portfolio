// ---------------------------
// Existing toggleMenu (keeps exactly as you had it)
// ---------------------------
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ---------------------------
// Typing / rotating text effect
// ---------------------------

// Words to rotate
const toRotate = ["AI & Data Science Enthusiast", "Aspiring Data Analyst","Python Developer", "Full-Stack Developer"];

// State variables
let loopNum = 0;
let isDeleting = false;
let text = "";
let typingSpeed = 150; // base speed (ms)
let pauseAfterFull = 1500; // pause when a word is fully typed
let pauseAfterDelete = 300; // small pause after deleting

// Main tick function
function tick() {
  const i = loopNum % toRotate.length;
  const fullText = toRotate[i];

  if (isDeleting) {
    // remove one char
    text = fullText.substring(0, text.length - 1);
  } else {
    // add one char
    text = fullText.substring(0, text.length + 1);
  }

  const el = document.getElementById("typing-text");
  if (el) {
    el.innerHTML = text;
  }

  // Calculate next timeout
  let timeout = typingSpeed + Math.random() * 100; // slight randomness

  if (!isDeleting && text === fullText) {
    // finished typing the word — pause, then start deleting
    timeout = pauseAfterFull;
    isDeleting = true;
  } else if (isDeleting && text === "") {
    // finished deleting — move to next word
    isDeleting = false;
    loopNum++;
    timeout = pauseAfterDelete;
  } else {
    // while typing or deleting, adjust speed (deleting slightly faster)
    if (isDeleting) timeout = timeout / 2;
  }

  setTimeout(tick, timeout);
}

// Start effect when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Only start if the placeholder exists
  if (document.getElementById("typing-text")) {
    tick();
  }
});

