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

const mainSections = document.querySelectorAll("main section");
const btns = document.querySelectorAll(".scrollBtns ul li");
const moveTopBtn = document.querySelector(".moveTop");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

let articleArr = Array.from(mainSections);
articleArr.unshift(header);
articleArr.push(footer);

let sectionTopArr = [];

for (let section of mainSections) {
  sectionTopArr.push(section.offsetTop);
}

sectionTopArr.unshift(header.offsetTop);
sectionTopArr.push(footer.offsetTop);

// 클릭시 상단으로 이동하는 버튼 생성
window.addEventListener("scroll", (e) => {
  if (Math.floor(scrollY) > 100) {
    moveTopBtn.style.opacity = 1;
  } else {
    moveTopBtn.style.opacity = 0;
  }
});

moveTopBtn.addEventListener("click", () => {
  new Anime(window, {
    prop: "scroll",
    value: 0,
    duration: 300,
  });
});

//버튼들 클릭할 때 활성화되게 설정
btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    moveScroll(index);

    for (let el of btns) {
      el.classList.remove("on");
    }

    btns[index].classList.add("on");
  });
});

//스크롤시 버튼들 차례대로 활성화
window.addEventListener("scroll", () => {
  let scroll = Math.floor(window.scrollY);

  articleArr.forEach((el, index) => {
    if (scroll + 90 >= sectionTopArr[index]) {
      for (let btn of btns) {
        btn.classList.remove("on");
      }
      btns[index].classList.add("on");

      for (let view of articleArr) {
        view.classList.remove("active");
      }

      articleArr[index].classList.add("active");
    }
  });
});

articleArr.forEach((el, index) => {
  window.addEventListener(
    "mousewheel",
    (e) => {
      e.preventDefault();

      let articleActive = document.querySelector(".active");
      let articleActiveIdx = articleArr.indexOf(articleActive);

      if (e.deltaY > 0) {
        moveScroll(articleActiveIdx + 1);
      } else {
        moveScroll(articleActiveIdx - 1);
      }
    },
    { passive: false }
  );
});

function moveScroll(index) {
  new Anime(window, {
    prop: "scroll",
    value: sectionTopArr[index],
    duration: 300,
  });
}
