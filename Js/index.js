const Follower = document.getElementById("cursor-circle");

var timer;

function updateTime() {
  const now = new Date();
  const year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  minutes = minutes < 10 ? "0" + minutes : minutes;
  const timeZone = "IST";

  const yearEl = document.getElementById("year");
  const timeEl = document.getElementById("time");
  if (yearEl) yearEl.textContent = `© ${year}`;
  if (timeEl) timeEl.textContent = `${hours}:${minutes} ${period} ${timeZone}`;
}

updateTime();
setInterval(updateTime, 60000);

window.addEventListener("load", () => {
  const mainElem = document.querySelector("#main");
  if (mainElem && typeof LocomotiveScroll !== "undefined") {
    try {
      if (typeof imagesLoaded !== "undefined") {
        imagesLoaded(mainElem, { background: true }, () => {
          new LocomotiveScroll({
            el: mainElem,
            smooth: true,
          });
        });
      } else {
        new LocomotiveScroll({
          el: mainElem,
          smooth: true,
        });
      }
    } catch (e) {
      console.warn("LocomotiveScroll initialization:", e);
    }
  }
});

function heroAnimation() {
  if (typeof gsap !== "undefined") {
    var tl = gsap.timeline();
    tl.from("#nav", {
      y: "-10",
      opacity: 0,
      duration: 1.2,
      ease: "expo.inOut",
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", heroAnimation);
} else {
  heroAnimation();
}

// Smooth cursor mouse follower
let xscale = 1;
let yscale = 1;
let xprev = 0;
let yprev = 0;

window.addEventListener("mousemove", (dets) => {
  clearTimeout(timer);

  let xdiff = Math.abs(dets.clientX - xprev);
  let ydiff = Math.abs(dets.clientY - yprev);

  xscale = typeof gsap !== "undefined" ? gsap.utils.clamp(0.8, 1.2, 1 + xdiff * 0.008) : 1;
  yscale = typeof gsap !== "undefined" ? gsap.utils.clamp(0.8, 1.2, 1 + ydiff * 0.008) : 1;

  xprev = dets.clientX;
  yprev = dets.clientY;

  if (Follower) {
    Follower.style.opacity = "1";
    Follower.style.transform = `translate(${dets.clientX - 5}px, ${dets.clientY - 5}px) scale(${xscale}, ${yscale})`;
  }

  timer = setTimeout(() => {
    if (Follower) {
      Follower.style.transform = `translate(${dets.clientX - 5}px, ${dets.clientY - 5}px) scale(1, 1)`;
    }
  }, 100);
});

window.addEventListener("mouseleave", () => {
  if (Follower) {
    Follower.style.opacity = "0";
  }
});