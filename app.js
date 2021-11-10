// Custom cursor

new kursor({
  type: 1,
  removeDefaultCursor: true,
});

// skeww

// Smooth scrolling

const body = document.body,
  scrollWrap = document.getElementsByClassName("smooth")[0],
  height = scrollWrap.getBoundingClientRect().height - 1,
  speed = 0.06;

var offset = 0;

body.style.height = Math.floor(height) + "px";

function smoothScroll() {
  offset += (window.pageYOffset - offset) * speed;

  var scroll = "translateY(-" + offset + "px) translateZ(0)";
  scrollWrap.style.transform = scroll;

  callScroll = requestAnimationFrame(smoothScroll);
}

smoothScroll();

// Animation

let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();

timeline.to(".art-text", 8, { y: 200 });
timeline.fromTo(
  ".container1",
  { borderRadius: 2800 },
  { borderRadius: 0, duration: 2.2 },
  "-=7"
);
timeline.fromTo(".cir", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=6");
timeline.fromTo(
  ".container2",
  { borderRadius: 2800 },
  { borderRadius: 0, duration: 2.2 },
  "-=5.5"
);
timeline.fromTo(
  ".opaci",
  { opacity: 0, y: "30%" },
  { opacity: 1, y: "0%", duration: 0.5 },
  "-=4.4"
);

let scene = new ScrollMagic.Scene({
  triggerElement: "nav .nav-div",
  duration: "300%",
  triggerHook: 0,
})

  .setTween(timeline)
  .setPin("nav .nav-div")
  .addTo(controller);

let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".skewness", "skewY", "deg"), // fast
  clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    console.log(skew);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {
        skew: 0,
        duration: 0.5,
        ease: "power3",
        overwrite: true,
        onUpdate: () => skewSetter(proxy.skew),
      });
    }
  },
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });
