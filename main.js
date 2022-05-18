const img = document.querySelectorAll(".gallery-img");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");

window.addEventListener("load", () => {
  const iso = new Isotope(".con", {
    itemSelector: ".gallery-img",
    columnWidth: ".gallery-img",
    transitionDurationL: "0.8s",
    gutter: 0,
  });
});

const categoryView = document.querySelector(".category .inner");
const mouseCursor = document.querySelector(".cursor");

categoryView.addEventListener("mousemove", cursor);
categoryView.addEventListener("scroll", cursor);

function cursor(e) {
  mouseCursor.style.left = e.pageX + "px";
  mouseCursor.style.top = e.pageY - scrollY + "px";
}

const mainViewSlider = document.querySelector(".mainGallery .inner .images");
const mainViewSliderImg = mainViewSlider.querySelectorAll("img");
const sliderPrevBtn = document.querySelector(".mainGallery .prev");
const sliderNextBtn = document.querySelector(".mainGallery .next");

mainViewSlider.prepend(mainViewSlider.lastElementChild);
mainViewSlider.style.left = "-100%";

sliderPrevBtn.addEventListener("click", () => {
  new Anime(mainViewSlider, {
    prop: "left",
    value: "0%",
    duration: 1000,
    callback: () => {
      new Anime(mainViewSlider, {
        prop: "left",
        value: "-100%",
        duration: 0,
        callback: () => {
          mainViewSlider.prepend(mainViewSlider.lastElementChild);
        },
      });
    },
  });
});

sliderNextBtn.addEventListener("click", () => {
  new Anime(mainViewSlider, {
    prop: "left",
    value: "-200%",
    duration: 1000,
    callback: () => {
      new Anime(mainViewSlider, {
        prop: "left",
        value: "-100%",
        duration: 0,
        callback: () => {
          mainViewSlider.append(mainViewSlider.firstElementChild);
        },
      });
    },
  });
});
