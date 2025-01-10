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
