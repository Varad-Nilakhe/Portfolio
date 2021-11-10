// Custom cursor

new kursor({
  type: 1,
  removeDefaultCursor: true,
  color: "#ff61e5",
});

// skeww

// Smooth scrolling

const body = document.body,
  scrollWrap = document.getElementsByClassName("first")[0],
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

// Animation

let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();

timeline.to(".art-text", 6, { y: 200 });

let scene = new ScrollMagic.Scene({
  triggerElement: "nav .nav-div",
  duration: "300%",
  triggerHook: 0,
})

  .setTween(timeline)
  .setPin("nav .nav-div")
  .addTo(controller);

let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".welcome-text", "skewY", "deg"), // fast
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
