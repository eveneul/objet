// mobile hamburger btn

const moblieMenuBtn = document.querySelector(".btn-menu");
const mobileMenu = document.querySelector(".menu-mobile");

moblieMenuBtn.addEventListener("click", () => {
  moblieMenuBtn.classList.toggle("on");
  mobileMenu.classList.toggle("on");
});

//Gallery page Isotope.js

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

// join form validation

const form = document.querySelector(".join-info");
const submitBtn = form.querySelector('[type="submit"]');
const resetBtn = form.querySelector('[type="reset"]');

submitBtn.addEventListener("click", (e) => {
  if (!isText("userID", 4, "아이디")) {
    e.preventDefault();
  }

  if (!isPwd("password", "re-password", 8)) {
    e.preventDefault();
  }

  if (!isText("name", 1, "이름")) {
    e.preventDefault();
  }
});

resetBtn.addEventListener("click", () => {
  let errMsgs = document.querySelectorAll("p");
  for (let msg of errMsgs) {
    msg.remove();
  }
});

function isText(attribute, len, value) {
  let textInput = form.querySelector(`[name=${attribute}]`);
  let textVal = textInput.value;
  let errMsg = document.createElement("p");
  let errMsgs = textInput.closest("td").querySelectorAll("p");

  if (textVal.length > len) {
    if (errMsgs.length > 0) {
      errMsgs.remove();
    }

    return true;
  } else {
    if (errMsgs.length > 0) {
      errMsgs.remove();
    }
    errMsg.append(`${value}를 ${len}글자 이상 입력해 주세요`);
    textInput.closest("td").append(errMsg);
    return false;
  }
}

function isPwd(attribute1, attribute2, len) {
  let pwd1 = form.querySelector(`[name=${attribute1}]`);
  let pwd2 = form.querySelector(`[name=${attribute2}]`);

  let pwd1Val = pwd1.value;
  let pwd2Val = pwd2.value;

  const errMsg = document.createElement("p");
  const errMsgs = pwd1.closest("td").querySelectorAll("p");

  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const spc = /[~!@#$%^&*()_.,]/;

  if (
    pwd1Val.length > len &&
    pwd1Val === pwd2Val &&
    num.test(pwd1Val) &&
    eng.test(pwd1Val) &&
    spc.test(pwd1Val)
  ) {
    if (errMsgs.length > 0) {
      errMsgs.remove();
    }
    return true;
  } else {
    if (errMsgs.length > 0) {
      errMsgs.remove();
    }
    errMsg.append(
      `비밀번호는 ${len}글자 이상, 텍스트와 숫자, 특수기호를 포함해서 입력해 주세요`
    );
    pwd1.closest("td").append(errMsg);
    return false;
  }
}
