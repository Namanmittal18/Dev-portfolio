const mouseFollower = document.getElementById("cursor-circle");
const imgcircle = document.querySelector(".elem-cursor");

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

// Initialize LocomotiveScroll smoothly
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
  if (typeof gsap === "undefined") {
    // If GSAP hasn't loaded yet, make sure elements are visible
    document.querySelectorAll(".boundingElem, .boundingElem-2").forEach((el) => {
      el.style.transform = "translateY(0)";
    });
    return;
  }

  var tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.2,
    ease: "expo.inOut",
  })
    .to(
      [".boundingElem", ".boundingElem-2"],
      {
        y: 0,
        ease: "expo.inOut",
        duration: 2,
        stagger: 0.2,
      },
      "0.3"
    )
    .from(
      "#hero-footer",
      {
        opacity: 0,
        duration: 1,
        ease: "expo.inOut",
      },
      "2.2"
    );
}

// Run hero animation immediately (or when DOM is ready)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", heroAnimation);
} else {
  heroAnimation();
}

// Fallback safety to ensure text is never permanently hidden
setTimeout(() => {
  document.querySelectorAll(".boundingElem, .boundingElem-2").forEach((el) => {
    if (getComputedStyle(el).transform !== "matrix(1, 0, 0, 1, 0, 0)") {
      el.style.transform = "translateY(0)";
    }
  });
}, 2500);

// High-performance smooth cursor follower
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

  if (mouseFollower) {
    mouseFollower.style.opacity = "1";
    mouseFollower.style.transform = `translate(${dets.clientX - 5}px, ${dets.clientY - 5}px) scale(${xscale}, ${yscale})`;
  }

  timer = setTimeout(() => {
    if (mouseFollower) {
      mouseFollower.style.transform = `translate(${dets.clientX - 5}px, ${dets.clientY - 5}px) scale(1, 1)`;
    }
  }, 100);
});

window.addEventListener("mouseleave", () => {
  if (mouseFollower) {
    mouseFollower.style.opacity = "0";
  }
});

// Category hover effect with preview image and VIEW circle
var rotate = 0;
var diffrot = 0;

document.querySelectorAll(".elem").forEach(function (elem) {
  const previewImg = elem.querySelector("img");

  function handleMouseMove(details) {
    if (mouseFollower) {
      mouseFollower.style.opacity = "0";
    }

    if (imgcircle) {
      imgcircle.style.transform = `translate(${details.clientX}px, ${details.clientY}px)`;
      if (typeof gsap !== "undefined") {
        gsap.to(imgcircle, {
          opacity: 1,
          duration: 0.2,
          ease: "power1.out",
        });
      } else {
        imgcircle.style.opacity = "1";
      }
    }

    if (previewImg) {
      const rect = elem.getBoundingClientRect();
      const topdiff = details.clientY - rect.top;
      const leftdiff = details.clientX - rect.left;

      diffrot = details.clientX - rotate;
      rotate = details.clientX;

      const clampedRot = typeof gsap !== "undefined" ? gsap.utils.clamp(-20, 20, diffrot * 0.5) : 0;

      if (typeof gsap !== "undefined") {
        gsap.to(previewImg, {
          opacity: 1,
          ease: "power1.out",
          duration: 0.2,
          top: topdiff,
          left: leftdiff,
          rotate: clampedRot,
        });
      } else {
        previewImg.style.opacity = "1";
        previewImg.style.top = `${topdiff}px`;
        previewImg.style.left = `${leftdiff}px`;
      }
    }
  }

  function handleMouseLeave() {
    if (mouseFollower) {
      mouseFollower.style.opacity = "1";
    }

    if (imgcircle) {
      if (typeof gsap !== "undefined") {
        gsap.to(imgcircle, {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
        });
      } else {
        imgcircle.style.opacity = "0";
      }
    }

    if (previewImg) {
      if (typeof gsap !== "undefined") {
        gsap.to(previewImg, {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
        });
      } else {
        previewImg.style.opacity = "0";
      }
    }
  }

  elem.addEventListener("mousemove", handleMouseMove);
  elem.addEventListener("mouseleave", handleMouseLeave);
});
