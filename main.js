const img = document.querySelectorAll(".gallery-img");
const searchIcon = document.querySelector(".fa-magnifying-glass");
const searchInput = document.querySelector(".search-input");

window.addEventListener("load", () => {
  const iso = new Isotope(".con", {
    itemSelector: ".gallery-img",
    columnWidth: ".gallery-img",
    transitionDurationL: "0.8s",
    gutter: 0,
  });
});

searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("on");
});
