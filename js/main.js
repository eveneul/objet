// mobile hamburger btn

const moblieMenuBtn = document.querySelector(".btn-menu");
const mobileMenu = document.querySelector(".menu-mobile");

moblieMenuBtn.addEventListener("click", () => {
  moblieMenuBtn.classList.toggle("on");
  mobileMenu.classList.toggle("on");
});

// cookie

// header tab focus

const gnbList = document.querySelectorAll(".gnbMenuGroup > li");

gnbList.forEach((list) => {
  list.addEventListener("mouseenter", (e) => {
    const sub = e.currentTarget.querySelector(".sub-menu");
    sub.style.display = "block";
  });

  list.addEventListener("mouseleave", (e) => {
    const sub = e.currentTarget.querySelector(".sub-menu");
    sub.style.display = "none";
  });

  list.addEventListener("focusin", (e) => {
    const sub = e.currentTarget.querySelector(".sub-menu");
    sub.style.display = "block";
  });

  const subLi = list.querySelector(".sub-menu ul");
  const subLiLast = subLi.lastElementChild;

  list.addEventListener("focusout", (e) => {
    const sub = e.currentTarget.querySelector(".sub-menu");
    if (subLiLast == e.target.closest("li")) {
      sub.style.display = "none";
    } else {
      sub.style.display = "block";
    }
  });
});
