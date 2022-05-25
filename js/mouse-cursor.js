const categoryView = document.querySelector(".category .inner");
const mouseCursor = document.querySelector(".category .cursor");

categoryView.addEventListener("mousemove");

function cursor(e) {
  mouseCursor.style.left = e.pageX + "px";
  mouseCursor.style.top = e.pageY - scrollY + "px";
}
