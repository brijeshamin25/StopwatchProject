let interval;
let time;

let timer = JSON.parse(localStorage.getItem("timer")) || {
  second: 0o0,
  minutes: 0o0,
  hours: 0o0,
  milSec: 0o0,
};

document.querySelector(".js-hr").innerHTML = timer.hours;
document.querySelector(".js-min").innerHTML = timer.minutes;
document.querySelector(".js-sec").innerHTML = timer.second;
document.querySelector(".js-milSec").innerHTML = timer.milSec;

const srtStp = document.querySelector(".js-startBtn");

srtStp.addEventListener("click", () => {
  if (time === false) {
    time = true;
    srtStp.innerHTML = "Stop";
    srtStp.addEventListener("mouseleave", () => {
      srtStp.style.backgroundColor = "rgb(206, 98, 90)";
    });
    srtStp.addEventListener("mousemove", () => {
      srtStp.style.backgroundColor = "rgb(189, 67, 58)";
    });
    startTme();
  } else {
    time = false;
    srtStp.innerHTML = "Start";
    srtStp.addEventListener("mouseleave", () => {
      srtStp.style.backgroundColor = "rgb(126, 203, 126)";
    });

    srtStp.addEventListener("mousemove", () => {
      srtStp.style.backgroundColor = "rgb(75, 177, 75)";
    });

    saveTime();
  }
});

// document.querySelector(".js-stopBtn").addEventListener("click", () => {
//   if (time == false) {
//     time = true;
//     //saveTime();
//     document.querySelector(".js-stopBtn").innerHTML = "Stop";
//     startTme();
//   } else {
//     //saveTime();
//     time = false;
//     document.querySelector(".js-stopBtn").innerHTML = "Re-Start";
//   }
// });

document.querySelector(".js-resetBtn").addEventListener("click", () => {
  resetComf();
});

function startTme() {
  if (time) {
    timer.milSec++;

    if (timer.milSec === 100) {
      timer.second++;
      timer.milSec = 0o0;
    } else if (timer.second === 60) {
      timer.minutes++;
      timer.second = 0o0;
    } else if (timer.minutes == 60) {
      timer.hours++;
      timer.minutes = 0o0;
      timer.second = 0o0;
    }

    let hrZero = timer.hours;
    let minZero = timer.minutes;
    let secZero = timer.second;
    let msZero = timer.milSec;

    if (timer.hours < 10) {
      hrZero = "0" + hrZero;
    } else if (timer.minutes < 10) {
      minZero = "0" + minZero;
    } else if (timer.second < 10) {
      secZero = "0" + secZero;
    } else if (timer.milSec < 10) {
      msZero = "0" + msZero;
    }

    //result();
    document.querySelector(".js-hr").innerHTML = hrZero;
    document.querySelector(".js-min").innerHTML = minZero;
    document.querySelector(".js-sec").innerHTML = secZero;
    document.querySelector(".js-milSec").innerHTML = msZero;
    setTimeout(startTme, 10);
    saveTime();
  }
}

function saveTime() {
  localStorage.setItem("timer", JSON.stringify(timer));
}

// function result() {
//   document.querySelector(".js-hr").innerHTML = hrZero;
//   document.querySelector(".js-min").innerHTML = minZero;
//   document.querySelector(".js-sec").innerHTML = secZero;
//   document.querySelector(".js-milSec").innerHTML = msZero;
// }

function reset() {
  timer.hours = 0o0;
  timer.minutes = 0o0;
  timer.second = 0o0;
  timer.milSec = 0o0;

  document.querySelector(".js-hr").innerHTML = "00";
  document.querySelector(".js-min").innerHTML = "00";
  document.querySelector(".js-sec").innerHTML = "00";
  document.querySelector(".js-milSec").innerHTML = "00";

  localStorage.removeItem("timer");

  // if (time === false) {
  //   document.querySelector(".js-stopBtn").innerHTML = "Stop";
  // }
}

function resetComf() {
  document.querySelector(
    ".js-alertMsg"
  ).innerHTML = `Are you sure you want to Rest the Stop Watch? 
  <button class="alertYes resetComfYes">Yes</button>
  <button class="alertNo resetComfNo">No</button>`;

  document.querySelector(".alertYes").addEventListener("click", () => {
    reset();
    hideAlert();
  });

  document.querySelector(".alertNo").addEventListener("click", () => {
    hideAlert();
  });
}

function hideAlert() {
  document.querySelector(".js-alertMsg").innerHTML = "";
}

// function startTime() {
//   if (!interval) {
//     timer = new Date().getTime() - pausedTime;
//     interval = setInterval(updateTime, 1000);
//   }
// }

// function updateTime() {
//   const currentTime = new Date().getTime();
//   const newTime = currentTime - timer;
//   const miSec = Math.floor(newTime % 60);
//   const sec = Math.floor(newTime / 1000) % 60;
//   const min = Math.floor(newTime / 1000 / 60) % 60;
//   const hr = Math.floor(newTime / 1000 / 60 / 60);
//   const dispTime = `${hr} Hr: ${min} Min : ${sec} Sec : ${miSec} MilliSec`;
//   document.querySelector(".time").innerHTML = dispTime;
// }
