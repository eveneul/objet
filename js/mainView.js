const categoryView = document.querySelector(".category .inner");
const mouseCursor = document.querySelector(".cursor");

categoryView.addEventListener("mousemove", cursor);
categoryView.addEventListener("scroll", cursor);

function cursor(e) {
  mouseCursor.style.left = e.pageX + "px";
  mouseCursor.style.top = e.pageY - scrollY + "px";
}

//silder

// const mainViewSlider = document.querySelector(".mainGallery .inner .images");
// const mainViewSliderImg = mainViewSlider.querySelectorAll("img");
// const sliderPrevBtn = document.querySelector(".mainGallery .prev");
// const sliderNextBtn = document.querySelector(".mainGallery .next");

// mainViewSlider.prepend(mainViewSlider.lastElementChild);
// mainViewSlider.style.left = "-100%";

// sliderPrevBtn.addEventListener("click", () => {
//   new Anime(mainViewSlider, {
//     prop: "left",
//     value: "0%",
//     duration: 1000,
//     callback: () => {
//       new Anime(mainViewSlider, {
//         prop: "left",
//         value: "-100%",
//         duration: 0,
//         callback: () => {
//           mainViewSlider.prepend(mainViewSlider.lastElementChild);
//         },
//       });
//     },
//   });
// });

// sliderNextBtn.addEventListener("click", () => {
//   new Anime(mainViewSlider, {
//     prop: "left",
//     value: "-200%",
//     duration: 1000,
//     callback: () => {
//       new Anime(mainViewSlider, {
//         prop: "left",
//         value: "-100%",
//         duration: 0,
//         callback: () => {
//           mainViewSlider.append(mainViewSlider.firstElementChild);
//         },
//       });
//     },
//   });
// });

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

// coockie

const popup = document.querySelector("#cookie");
const popupClose = document.querySelector(".popupCloseBtn");
const daypopClose = document.querySelector(".dayCloseBtn");

const isCookie = document.cookie.indexOf("objet=close");

function setCookie(name, value, time) {
  const today = new Date();
  const newDay = today.getDate();
  today.setDate(newDay + time);

  const dueDate = today.toGMTString();

  document.cookie = `${name}=${value}; path="/"; expires=${dueDate}`;
}

if (isCookie == -1) {
  popup.style.display = "block";
} else {
  popup.style.display = "none";
}

daypopClose.addEventListener("click", (e) => {
  e.preventDefault();
  setCookie("objet", "close", 1);
  popup.style.display = "none";
});

popupClose.addEventListener("click", (e) => {
  e.preventDefault();
  setCookie("objet", "close", 0);
  popup.style.display = "none";
});

//skip Navigation

const skipNavi = document.querySelectorAll("#skipNavi ul li a");

for (let el of skipNavi) {
  el.addEventListener("focusin", (e) => {
    el.classList.add("on");
  });

  el.addEventListener("focusout", (e) => {
    el.classList.remove("on");
  });
}

// location

const locationTabs = document.querySelectorAll(".location-menu li");
const locationMap = document.querySelectorAll(".location-map-list li");

locationTabs.forEach((el, index) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    locationOn(locationTabs, index);
    locationOn(locationMap, index);
  });
});

function locationOn(arr, index) {
  for (let el of arr) {
    el.classList.remove("on");
  }

  arr[index].classList.add("on");
}

var gangnam = document.getElementById("gangnam");
var options = {
  center: new kakao.maps.LatLng(37.49797742928841, 127.02751396250248),
  draggable: false,
  level: 3,
};

var map = new kakao.maps.Map(gangnam, options); //지도 생성 및 객체 리턴

var hongdae = document.getElementById("hongdae");
var options = {
  center: new kakao.maps.LatLng(37.55604537240584, 126.92299340788084),
  draggable: false,
  level: 3,
};

var map = new kakao.maps.Map(hongdae, options); //지도 생성 및 객체 리턴

var nowon = document.getElementById("nowon");
var options = {
  center: new kakao.maps.LatLng(37.654666083609655, 127.06048089676263),
  draggable: false,
  level: 3,
};

var map = new kakao.maps.Map(nowon, options); //지도 생성 및 객체 리턴

function setDraggable(draggable) {
  gangnam.setDraggable(draggable);
}
