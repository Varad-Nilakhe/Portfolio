

// another gsap
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.fromTo(
  ".slide4",
  { opacity: 0, y: "-155%", fontSize: "10rem" },
  { opacity: 1, y: "-178%", duration: 0.6 }
);
tl.fromTo(
  ".slide5",
  { opacity: 0, y: "-155%", fontSize: "10rem" },
  { opacity: 1, y: "-183%", duration: 0.6 },
  "-=0.4"
);
tl.fromTo(
  "#arttext",
  { opacity: 0, y: "-58%", fontSize: "65rem" },
  { opacity: 1, y: "-68%", duration: 1 },
  "-=0.6"
);
tl.to(".slide4", {
  y: "0%",
  fontSize: "7.5rem",
  duration: 0.6,
});
tl.to(".slide5", { y: "0%", fontSize: "7.5rem", duration: 0.6 }, "-=0.6");
tl.to("#arttext", { y: "0%", fontSize: "40rem", duration: 1 }, "-=0.4");

tl.fromTo(
  ".slide1",
  { opacity: 0, y: "30%" },
  { opacity: 1, y: "0%", duration: 0.6 }
);
tl.fromTo(
  ".slide2",
  { opacity: 0, y: "30%" },
  { opacity: 1, y: "0%", duration: 0.6 },
  "-=0.4"
);
tl.fromTo(
  ".slide3",
  { opacity: 0, y: "30%" },
  { opacity: 1, y: "0%", duration: 0.6 },
  "-=0.4"
);
tl.fromTo(
  ".imgsc",
  { opacity: 0, width: "50rem" },
  { opacity: 0.4, width: "10rem", duration: 0.6 },
  "-=0.4"
);
tl.fromTo(".imgs", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.6");

tl.fromTo(".slidedef", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.6");
tl.fromTo(
  "#nav-div",
  { opacity: 0, y: "-50%" },
  { opacity: 1, y: "0%", duration: 0.6 },
  "-=0.6"
);

// Custom cursor

new kursor({
  type: 1,
  color: "rgb(65, 37, 26)",
  removeDefaultCursor: true,
});

// Smooth scrolling

const body = document.body,
  scrollWrap = document.getElementsByClassName("smooth")[0],
  height = scrollWrap.getBoundingClientRect().height - 1,
  speed = 0.08;

var offset = 0;

body.style.height = Math.floor(height) + "px";

function smoothScroll() {
  offset += (window.pageYOffset - offset) * speed;

  var scroll = "translateY(-" + offset + "px) translateZ(0)";
  scrollWrap.style.transform = scroll;

  callScroll = requestAnimationFrame(smoothScroll);
}

smoothScroll();

//burger toggle
const burger = document.querySelector(".burger");

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5,x: -18, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5,x: -18, background: "black" });
    gsap.to(".logo", 0.5, { opacity: "0" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0,x: 0, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0,x: 0, background: "black" });
    gsap.to(".logo", 1, { opacity: "1" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}



// Animation

let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();


timeline.to(".art-text", 20, { y: 400 });
timeline.fromTo(
  ".container1",
  { borderRadius: 2800 },
  { borderRadius: -600, duration: 4 },
  "-=15.2"
);
timeline.fromTo(".cir", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=14");
timeline.fromTo(
  ".container2",
  { borderRadius: 2800 },
  { borderRadius: -600, duration: 4 },
  "-=11"
);
timeline.fromTo(
  ".opaci",
  { opacity: 0, y: "30%" },
  { opacity: 1, y: "0%", duration: 1 },
  "-=10"
);
timeline.fromTo(
  ".container3",
  { borderRadius: 2800 },
  { borderRadius: -600, duration: 4 },
  "-=5"
);
timeline.fromTo(
  ".cam",
  { rotation: 20, width: "15rem" },
  { rotation: -25, width: "25rem", duration: 4 },
  "-=6"
);

timeline.to(".webdev", { y: "10%" }, { y: "0%", duration: 1 }, "-=2");

let scene = new ScrollMagic.Scene({
  triggerElement: "nav .nav-div",
  duration: "300%",
  triggerHook: 0,
})

  .setTween(timeline)
  .setPin("nav .nav-div")
  .addTo(controller);


//event listeners
burger.addEventListener("click", navToggle);

// gsap animation 2
let timeline2 = new TimelineMax();

// skeww effect

let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".skew", "skewY", "deg"), // fast
  clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -200);
    console.log(skew);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {
        skew: 0,
        duration: 1,
        ease: "power3",
        overwrite: true,
        onUpdate: () => skewSetter(proxy.skew),
      });
    }
  },
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });

