const img = document.querySelectorAll(".gallery-img");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");

window.addEventListener("load", () => {
  const iso = new Isotope(".gallery-wrap", {
    itemSelector: ".gallery-img",
    columnWidth: ".gallery-img",
    transitionDurationL: "0.8s",
    gutter: 0,
  });
});
