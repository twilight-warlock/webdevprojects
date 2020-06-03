class Timer {
  constructor(durationInput, startbtn, pausebtn, callbacks) {
    this.durationInput = durationInput;
    this.startbtn = startbtn;
    this.pausebtn = pausebtn;
    // this.timeRemaining = this.durationInput;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      //   this.onPer = callbacks.onPer;
    }
    this.startbtn.addEventListener("click", this.start);
    this.pausebtn.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeLeft);
    }
    this.tick();
    this.interval = setInterval(this.tick, 10);
    this.interval2 = setInterval(this.onPer, 1000);
  };
  //   perSec = () => {
  //     if (this.timeRemaining >= 0) {
  //       this.timeRemaining = this.timeRemaining - 0.5;
  //       if (this.onPer) {
  //         this.onPer(this.timeRemaining);
  //       }
  //     }
  //   };

  pause = () => {
    clearInterval(this.interval);
    clearInterval(this.interval2);
  };

  tick = () => {
    if (this.timeLeft <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      // this.setTime(this.getTime() - 1);
      this.timeLeft = this.timeLeft - 0.01;
      if (this.onTick) {
        this.onTick(this.timeLeft);
      }
    }
  };

  get timeLeft() {
    return parseFloat(this.durationInput.value);
  }

  set timeLeft(time) {
    this.durationInput.value = time.toFixed(2);
  }
  //   getTime() {
  //     return parseFloat(this.durationInput.value);
  //   }
  //   setTime(time) {
  //     this.durationInput.value = time;
  //   }
}
