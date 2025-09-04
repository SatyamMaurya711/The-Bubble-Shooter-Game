var score = 0;
var time = 60;
var hitnum = 0;

// Dark Mode

function themeChange() {
  var element = document.body;
  element.classList.toggle("dark-theme");
}

//  Get New Hit Number

function getNewHit() {
  hitnum = Math.floor(Math.random() * 10);
  document.querySelector("#hit").textContent = hitnum;
}

// Timer

function Timer() {
  setInterval(function () {
    if (time > 0) {
      time--;
      document.querySelector("#timer").textContent = time;
    } else {
      clearInterval(time);
      document.querySelector("#pbottom").innerHTML = `
        <div class="gameover">
          <h1>Game Over</h1>
          <button onclick="restartGame()" class="restart-btn">Restart</button>
        </div>
      `;
    }
  }, 1000);
}

// Number of bubbles depends on screen width
let bubbleCount;
if (window.innerWidth < 480) {
  bubbleCount = 50; // Mobile
} else if (window.innerWidth < 768) {
  bubbleCount = 90; // Tablet
} else {
  bubbleCount = 141; // Desktop
}

// Make Bubble

function MakeBubble() {
  var clutter = "";
  for (var i = 1; i < bubbleCount; i++) {
    var num = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${num}</div>`;
  }
  document.querySelector("#pbottom").innerHTML = clutter;
}

// Increase Score

function CalcScore() {
  score += 10;
  document.querySelector("#score").textContent = score;
}

// Bubble Click

document
  .querySelector("#pbottom")
  .addEventListener("click", function (details) {
    selectedNum = Number(details.target.textContent);
    if (selectedNum === hitnum) {
      document.getElementById("rightSound").play();
      CalcScore();
      MakeBubble();
      getNewHit();
    } else {
      document.getElementById("wrongSound").play();
    }
  });

// Initialize game

document.querySelector("#score").textContent = score;
document.querySelector("#timer").textContent = time;

Timer();
MakeBubble();
getNewHit();

// Function Restart

function restartGame() {
  score = 0;
  time = 60;
  document.querySelector("#score").textContent = score;
  document.querySelector("#timer").textContent = time;
  MakeBubble();
  getNewHit();
  Timer();
}
