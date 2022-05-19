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

//silder

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

// scroll event (main page)

const sections = document.querySelectorAll("main section");
const btns = document.querySelectorAll(".scrollBtns ul li");
const moveTopBtn = document.querySelector(".moveTop");

let sectionsTopArr = [];

for (let section of sections) {
  sectionsTopArr.push(section.offsetTop);
}

btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    scrollAni(index);

    for (let btnEl of btns) {
      btnEl.classList.remove("on");
    }
    btns[index].classList.add("on");
  });
});

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;

  if (scroll >= 100) {
    moveTopBtn.style.opacity = 1;
  } else if (scroll < 100) {
    moveTopBtn.style.opacity = 0;
  }

  sections.forEach((section, index) => {
    if (scroll + 100 >= sectionsTopArr[index]) {
      for (let btn of btns) {
        btn.classList.remove("on");
      }
      btns[index].classList.add("on");

      for (let section of sections) {
        section.classList.remove("on");
      }
      sections[index].classList.add("on");
    }
  });
});

moveTopBtn.addEventListener("click", () => {
  new Anime(window, {
    prop: "scroll",
    value: 0,
    duration: 300,
  });
});

sections.forEach((section, index) => {
  window.addEventListener(
    "mousewheel",
    (e) => {
      e.preventDefault();

      let sectionsArr = Array.from(sections);
      let sectionOn = document.querySelector("section.on");
      let sectionActive = sectionsArr.indexOf(sectionOn);

      if (e.deltaY < 0) {
        if (sectionActive == 0) {
          return;
        }
        scrollAni(sectionActive - 1);
      } else {
        if (sectionActive == sectionsTopArr.length) return;
        scrollAni(sectionActive + 1);
      }
    },
    { passive: false }
  );
});

function scrollAni(index) {
  new Anime(window, {
    prop: "scroll",
    value: sectionsTopArr[index],
    duration: 500,
  });
}
