let countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 14);

let x = setInterval(function () {
  let now = new Date().getTime();

  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("Countdown").innerHTML =
    "<div class='time'><h6>" +
    days +
    "</h6><span>days</span></div>" +
    "<div class='time'><h6>" +
    hours +
    "</h6><span>hours</span></div>" +
    "<div class='time'><h6>" +
    minutes +
    "</h6><span>minutes</span></div>" +
    "<div class='time'><h6>" +
    seconds +
    "</h6><span>seconds</span></div>";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("Countdown").innerHTML = "EXPIRED";
  }
}, 1000);
