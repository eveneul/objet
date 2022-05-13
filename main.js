const menuBtn = document.querySelector(".btn-menu");
const menuMo = document.querySelector(".menu-mobile");

menuBtn.addEventListener("click", (e) => {
  e.preventDefault();

  menuBtn.classList.toggle("on");
  menuMo.classList.toggle("on");
});

const swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  loop: true,
});
