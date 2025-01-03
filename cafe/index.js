// Nav Bar

let bars = document.querySelector(".bars");
let xmark = document.querySelector(".xmark");
let nav = document.querySelector("nav");
let links = document.querySelectorAll("nav ul li");

bars.addEventListener("click", () => {
  nav.classList.toggle("active");
  xmark.classList.toggle("active");
  bars.classList.toggle("active");
});

xmark.addEventListener("click", () => {
  nav.classList.toggle("active");
  xmark.classList.toggle("active");
  bars.classList.toggle("active");
});

links.forEach((e) => {
  e.addEventListener("click", () => {
    nav.classList.toggle("active");
    xmark.classList.toggle("active");
    bars.classList.toggle("active");
  });
});

// Scroll Up

let scrollUp = document.querySelector(".up");

window.onscroll = function () {
  window.scrollY >= 500
    ? scrollUp.classList.add("active")
    : scrollUp.classList.remove("active");
};

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
});

// Valid Form
let form = document.querySelector(".contacts form");

form.onsubmit = function (e) {
  e.preventDefault();

  let phoneNumber = document.querySelector(
    ".contacts form input[type='text']"
  ).value;
  let peopleNumber = document.querySelector(
    ".contacts form input[type='number']"
  ).value;

  let phoneRegex = /^\d{7,15}$/;
  let peopleRegex = /^[1-9]$/;

  let phoneValidation = phoneRegex.test(phoneNumber);
  let peopleValidation = peopleRegex.test(peopleNumber);

  if (!phoneValidation) {
    alert("Write a valid phone number (7 to 15 digits)");
    return false;
  }

  if (!peopleValidation) {
    alert("Write a valid number of people (1 to 9)");
    return false;
  }

  alert("Form submitted successfully!");
  form.submit();
};

// Fill in Heart

const hearts = document.querySelectorAll(".heart");

document.addEventListener("DOMContentLoaded", () => {
  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  favorites.forEach((id) => {
    const heart = document.querySelector(`.heart[data-id="${id}"]`);
    if (heart) {
      heart.classList.add("selected"); // Add a class to indicate it's selected
    }
  });
});

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    const id = heart.dataset.id;
    let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

    if (favorites.includes(id)) {
      favorites = favorites.filter((item) => item !== id);
      heart.classList.remove("selected");
    } else {
      favorites.push(id);
      heart.classList.add("selected");
    }

    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  });
});

// Image Slider
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("previous");
const currButton = document.getElementById("current");
const currentButton = document.getElementById("current");
const nextButton = document.getElementById("next");

let currentIndex = 0;
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevButton.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  updateSlider();
  resetInterval();
});

currButton.addEventListener("click", () => {
  currentIndex = 1;
  updateSlider();
  resetInterval();
});

nextButton.addEventListener("click", () => {
  currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  updateSlider();
  resetInterval();
});

function autoSlide() {
  currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  updateSlider();
}

let autoSlideInterval = setInterval(autoSlide, 5000);

function resetInterval() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(autoSlide, 5000);
}

/* ----------------- */
let startX = 0;
let endX = 0;
slider.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
});

slider.addEventListener("touchend", (event) => {
  endX = event.changedTouches[0].clientX;
  if (startX > endX + 50) {
    currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  } else if (startX < endX - 50) {
    currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  }
  updateSlider();
  resetInterval();
});

/* --------------- */
let isMouseDown = false;
slider.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  startX = event.clientX;
});

slider.addEventListener("mouseup", (event) => {
  if (!isMouseDown) return;
  endX = event.clientX;
  isMouseDown = false;
  handleSwipe();
});

slider.addEventListener("mouseleave", () => {
  isMouseDown = false;
});

function handleSwipe() {
  if (startX > endX + 50) {
    currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  } else if (startX < endX - 50) {
    currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  }
  updateSlider();
  resetInterval();
}
