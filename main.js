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

// searchIcon.addEventListener("click", () => {
//   searchInput.classList.toggle("on");
// });

// const lis = document.querySelectorAll(".gnb ul li");

// lis.forEach((el, index) => {
//   el.addEventListener("mouseenter", () => {
//     for (let idx of lis) {
//       idx.classList.add("on");
//     }

//     el[index].classList.remove("on");
//   });
// });

const categoryView = document.querySelector(".category .inner");
const mouseCursor = document.querySelector(".cursor");

categoryView.addEventListener("mousemove", cursor);
categoryView.addEventListener("scroll", cursor);

function cursor(e) {
  mouseCursor.style.left = e.pageX + "px";
  mouseCursor.style.top = e.pageY - scrollY + "px";
}
