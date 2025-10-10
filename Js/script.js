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

  document.getElementById("year").textContent = `© ${year}`;
  document.getElementById(
    "time"
  ).textContent = `${hours}:${minutes} ${period} ${timeZone}`;
}

updateTime();
setInterval(updateTime, 60000);

window.addEventListener("load", () => {
  imagesLoaded(document.querySelector("#main"), { background: true }, () => {
    const scroll = new LocomotiveScroll({
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

    .to(
      [".boundingElem", ".boundingElem-2"],
      {
        y: 0,
        ease: Expo.easeInOut,
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
        ease: Expo.easeInOut,
      },
      "2.2"
    );
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
      mouseFollower.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    }, 100);
  });
}

skewMouse();

function cursorMouse(xscale, yscale) {
  window.addEventListener("mousemove", (dets) => {
    mouseFollower.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });

  window.addEventListener("mouseleave", () => {
    mouseFollower.style.opacity = 0;
  });
}

cursorMouse();

var rotate = 0;
var diffrot = 0;

document.querySelectorAll(".elem").forEach(function (elem) {
  function handleMouseMove(details) {
    mouseFollower.style.opacity = 0;
    imgcircle.style.transform = `translate(${details.pageX - 35}px, ${details.pageY - 35}px)`;
    gsap.to(imgcircle, {
      opacity: 1,
      ease: Power1,
    });

    let topdiff = details.clientY - elem.getBoundingClientRect().top;
    diffrot = details.clientX - rotate;
    rotate = details.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power1,
      top: topdiff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  }

  function handleMouseLeave(details) {
    mouseFollower.style.opacity = 1;
    gsap.to(imgcircle, {
      opacity: 0,
      ease: Power1,
    });
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power1,
    });
  }

  function checkScreenWidth() {
    elem.removeEventListener("mousemove", handleMouseMove);
    elem.removeEventListener("mouseleave", handleMouseLeave);
    
    if (window.innerWidth > 900) {
      elem.addEventListener("mousemove", handleMouseMove);
      elem.addEventListener("mouseleave", handleMouseLeave);
    }
  }

  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
});
