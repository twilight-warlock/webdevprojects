const avatar = document.querySelector("#player");
const cash = document.querySelector("#cash");

// ------------------------Functions-----------------------------
function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

function getLocation(pos) {
  if (!pos) return 0;
  return parseInt(pos.slice(0, -2));
}

function moveCash() {
  const x = Math.floor(Math.random() * (window.innerWidth - 100));
  const y = Math.floor(Math.random() * (window.innerHeight - 100));
  cash.style.left = `${x}px`;
  cash.style.top = `${y}px`;
  cash.style.transition = "top,left 0.3s";
}

function moveVertical(el, amt) {
  const currTop = getLocation(el.style.top);
  el.style.top = `${currTop + amt}px`;
  el.style.transition = "top 0.3s";
}
function moveHorizontal(el, amt) {
  const currLeft = getLocation(el.style.left);
  el.style.left = `${currLeft + amt}px`;
  el.style.transition = "left 0.3s";
}

// ---------------------Event Listener----------------------

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowDown") {
    moveVertical(avatar, 50);
  } else if (e.key === "ArrowUp") {
    moveVertical(avatar, -50);
  } else if (e.key === "ArrowRight") {
    moveHorizontal(avatar, 50);
    avatar.style.transform = "scale(1,1)";
  } else if (e.key === "ArrowLeft") {
    moveHorizontal(avatar, -50);
    avatar.style.transform = "scale(-1,1)";
  }
  if (isTouching(avatar, cash)) moveCash();
});

moveCash();
