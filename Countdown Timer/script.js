const durationInput = document.querySelector("#duration");
const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const circleOuter = document.querySelector("#circleOuter");
// const circleInner = document.querySelector("#circleInner");

const perimeter1 = circleOuter.getAttribute("r") * 2 * Math.PI;
circleOuter.setAttribute("stroke-dasharray", perimeter1);
// const perimeter2 = circleInner.getAttribute("r") * 2 * Math.PI;
// circleInner.setAttribute("stroke-dasharray", perimeter2);
let duration;

const timer = new Timer(durationInput, start, pause, {
  onStart(totalTime) {
    duration = totalTime;
  },
  onTick(timeLeft) {
    circleOuter.setAttribute(
      "stroke-dashoffset",
      perimeter1 * (timeLeft / duration) - perimeter1
    );
  },
  onComplete() {
    console.log("Completed");
  },
  //   onPer(val) {
  //     circleInner.setAttribute("stroke-dashoffset", val);
  //   },
});
