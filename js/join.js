const form = document.querySelector("#join");
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

  if (textVal.length >= len) {
    let errMsgs = textInput.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) {
      textInput.closest("td").querySelector("p").remove();
    }
    return true;
  } else {
    let errMsgs = textInput.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) {
      textInput.closest("td").querySelector("p").remove();
    }
    const errMsg = document.createElement("p");
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

  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const str = /[~!@#$%^&*()_+,.]/;

  if (
    pwd1Val === pwd2Val &&
    pwd1Val.length >= len &&
    num.test(pwd1Val) &&
    eng.test(pwd1Val) &&
    str.test(pwd1Val)
  ) {
    const errMsgs = pwd1.closest("td").querySelectorAll("p");

    if (errMsgs.length > 0) {
      pwd1.closest("td").querySelector("p").remove();
    }
    return true;
  } else {
    const errMsg = document.createElement("p");
    const errMsgs = pwd1.closest("td").querySelectorAll("p");

    if (errMsgs.length > 0) {
      pwd1.closest("td").querySelector("p").remove();
    }
    errMsg.append(
      `비밀번호는 숫자, 알파벳, 특수문자를 각 1개 이상으로 총 ${len}글자 이상 입력해 주세요`
    );
    pwd1.closest("td").append(errMsg);
  }
}
