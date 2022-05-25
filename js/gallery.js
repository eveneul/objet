//Key: c242a84b957d53602081a6a1c4adef5d
//rest: https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value
//사진불러오기: https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg (사진 불러오기)
//search method: flickr.photos.search
//사용자 프로필 사진 http://farm{icon-farm}.staticflickr.com/{icon-server}/buddyicons/{nsid}.jpg
//프로필 사진 미설정시 https://www.flickr.com/images/buddyicon.gif
//

const list = document.querySelector(".img-list");
const loading = document.getElementById("loading");
const loadBar = document.querySelector("#loading div span");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const searchBox = document.querySelector(".search-box");

const key = "c242a84b957d53602081a6a1c4adef5d";
const base = "https://www.flickr.com/services/rest/?";
const method = "flickr.interestingness.getList";
const methodSearch = "flickr.photos.search";
const per_page = 50;
const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;

const methodMyPhoto = "flickr.people.getPhotos";
const myKey = "195703740@N02";
const myPhotoUrl = `${base}method=${methodMyPhoto}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&user_id=${myKey}`;

callImgDate(myPhotoUrl);

function callImgDate(url) {
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      let items = json.photos.photo;
      createGallery(items);
      imgLoading();
    });
}

function createGallery(items) {
  let result = "";
  items.forEach((item) => {
    let imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
    let imgSrcBig = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`;

    result += `
          <li class="item">
            <div class="img-con">
              <a href="${imgSrcBig}" class="pic">
                <img src="${imgSrc}" />
              </a>
              <div class="img-author">
                <span>${item.owner}</span>
                <p>${item.title}</p>
                <img src="http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg" />
              </div>
            </div>
          </li>
      `;
  });

  list.innerHTML = result;
}

function imgLoading() {
  const thumb = document.querySelectorAll(".pic img");
  let len = thumb.length;
  let count = 0;

  thumb.forEach((img) => {
    img.onload = () => {
      count++;
      loadBar.style.width = count * 2 + "%";

      if (count == len) iso();

      new Anime(loading, {
        prop: "opacity",
        value: 0,
        duration: 500,
        callback: () => {
          setTimeout(() => {
            loading.style.display = "none";
          }, 200);
          list.classList.add("on");
        },
      });
    };

    img.onerror = () => {
      img.setAttribute("src", "../img/top.jpeg");
    };
  });

  const buddyProfile = document.querySelectorAll(".img-author img");
  buddyProfile.forEach((buddy) => {
    buddy.onerror = () => {
      buddy.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
    };
  });
}

function iso() {
  new Isotope(".img-list", {
    itemSelector: ".item",
    columnWidth: ".item",
    transitionDuration: "0.5s",
  });
}

list.addEventListener("click", (e) => {
  e.preventDefault();

  const imgAuthor = e.target.closest(".img-con").querySelector(".img-author");
  const imgAuthor_p = imgAuthor.querySelector("p");
  const imgAuthor_span = imgAuthor.querySelector("span");
  const imgAuthor_img = imgAuthor.querySelector("img");

  let target = e.target.parentElement.querySelector("img");
  if (
    e.target == target ||
    e.target == imgAuthor ||
    e.target == imgAuthor_p ||
    e.target == imgAuthor_span ||
    e.target == imgAuthor_img
  ) {
    let imgSrc = target.parentElement.getAttribute("href");
    let pop = document.createElement("aside");

    pop.classList.add("pop");

    let pops = `
    <div class="popup-content">
      <img src=${imgSrc} />
    </div>
    <span class="closeBtn">
      <i class="fa-solid fa-xmark"></i>
    </span>
    `;

    pop.innerHTML = pops;
    document.body.append(pop);
  }
});

function test(target) {}

document.body.addEventListener("click", (e) => {
  let pop = document.querySelector(".pop");

  if (pop) {
    const closeBtn = pop.querySelector("span");
    const closeBtn2 = pop.querySelector("i");

    if (e.target == closeBtn || e.target == closeBtn2) {
      pop.remove();
    }
  }
});

searchBtn.addEventListener("mouseenter", () => {
  searchInput.style.width = "200px";
});

searchBtn.addEventListener("click", (e) => {
  let tag = searchInput.value.trim();

  if (tag) {
    const errMsgs = searchInput.parentElement.querySelectorAll("p");
    const url = `${base}method=${methodSearch}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

    if (errMsgs.length < 0) {
      errMsgs[0].remove();
    }

    callImgDate(url);
  } else {
    list.innerHTML = "";
    list.style.height = "auto";

    const errMsgs = searchInput.parentElement.querySelectorAll("p");

    if (errMsgs.length < 0) {
      errMsgs[0].remove();
    }

    const errMsg = document.createElement("p");
    errMsg.append("검색어를 입력하세요");
    searchInput.parentElement.append(errMsg);
  }
});

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    let tag = searchInput.value.trim();

    if (tag) {
      const errMsgs = searchInput.parentElement.querySelectorAll("p");
      const url = `${base}method=${methodSearch}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

      if (errMsgs.length < 0) {
        errMsgs[0].remove();
      }

      callImgDate(url);
    } else {
      list.innerHTML = "";
      list.style.height = "auto";

      const errMsgs = searchInput.parentElement.querySelectorAll("p");

      if (errMsgs.length < 0) {
        errMsgs[0].remove();
      }

      const errMsg = document.createElement("p");
      errMsg.append("검색어를 입력하세요");
      searchInput.parentElement.append(errMsg);
    }
  }
});
