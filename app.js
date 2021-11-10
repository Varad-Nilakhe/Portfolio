new kursor({
  type: 1,
  removeDefaultCursor: true,
  color: "#ff61e5",
});

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
