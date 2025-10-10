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

  document.getElementById("year").textContent = `© ${year}`;
  document.getElementById(
    "time"
  ).textContent = `${hours}:${minutes} ${period} ${timeZone}`;
}

updateTime();
setInterval(updateTime, 60000);

window.addEventListener("load", () => {
    imagesLoaded(document.querySelector("#main"), { background: true }, () => {
      const vscroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
      });
    });
  });
  

function heroAnimation() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.2,
    ease: Expo.easeInOut,
  })
}

heroAnimation();

//to skew cursor mouse
function skewMouse() {
  let xscale = 1;
  let yscale = 1;
  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timer);
    let xdiff = dets.clientX - xprev;
    let ydiff = dets.clientY - yprev;

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    yprev = dets.clientY;
    xprev = dets.clientX;

    cursorMouse(xscale, yscale);
    
    timer = setTimeout(() => {
      Follower.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    }, 100);
  });
}

skewMouse();

function cursorMouse(xscale, yscale) {
  window.addEventListener("mousemove", (dets) => {
    Follower.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });

  window.addEventListener("mouseleave", () => {
    Follower.style.opacity = 0;
  });
}

cursorMouse();