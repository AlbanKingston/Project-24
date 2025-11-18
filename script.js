const digitalClock = document.getElementById("digitalClock");
const analogClock = document.getElementById("analogClock");
const toggleBtn = document.getElementById("toggleBtn");

digitalClock.classList.remove("hidden");
analogClock.classList.add("hidden");

function updateDigitalClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const timeString =
    `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}` +
    `:${seconds.toString().padStart(2, "0")} ${ampm}`;

  document.getElementById("time").textContent = timeString;

  const options = { year: "numeric", month: "long", day: "numeric" };
  document.getElementById("date").textContent = now.toLocaleDateString("en-US", options);

  document.getElementById("day").textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
  });
}

function updateAnalogClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  document.getElementById("secondHand").style.transform =
    `translateX(-50%) rotate(${secondDeg}deg)`;
  document.getElementById("minuteHand").style.transform =
    `translateX(-50%) rotate(${minuteDeg}deg)`;
  document.getElementById("hourHand").style.transform =
    `translateX(-50%) rotate(${hourDeg}deg)`;
}

const tickSound = document.getElementById("tickSound");
const chimeSound = document.getElementById("chimeSound");

function playClockSounds() {
  tickSound.currentTime = 0;
  tickSound.play();

  const now = new Date();
  if (now.getMinutes() === 0 && now.getSeconds() === 0) {
    chimeSound.play();
  }
}

toggleBtn.addEventListener("click", () => {
  const isDigitalVisible = !digitalClock.classList.contains("hidden");

  if (isDigitalVisible) {
    digitalClock.classList.add("hidden");
    analogClock.classList.remove("hidden");
    toggleBtn.textContent = "Switch to Digital";
  } else {
    analogClock.classList.add("hidden");
    digitalClock.classList.remove("hidden");
    toggleBtn.textContent = "Switch to Analog";
  }
});

setInterval(() => {
  updateDigitalClock();
  updateAnalogClock();
  playClockSounds();
}, 1000);

updateDigitalClock();
updateAnalogClock();
playClockSounds();