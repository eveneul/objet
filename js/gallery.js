class Gallery {
  constructor(frame, opt) {
    this.list = document.querySelector(frame);
    this.loading = document.getElementById("loading");
    this.loadBar = document.querySelector("#loading div span");
    this.searchInput = document.querySelector(".search-input");
    this.searchBtn = document.querySelector(".search-btn");
    this.searchBox = document.querySelector(".search-box");

    this.key = opt.key;
    this.base = "https://www.flickr.com/services/rest/?";
    this.method = "flickr.interestingness.getList";
    this.methodSearch = "flickr.photos.search";
    this.per_page = opt.perPage;
    this.url = `${this.base}method=${this.method}&api_key=${this.key}&per_page=${this.per_page}&format=json&nojsoncallback=1`;

    this.methodMyPhoto = "flickr.people.getPhotos";
    this.myKey = opt.myKey;
    this.myPhotoUrl = `${this.base}method=${this.methodMyPhoto}&api_key=${this.key}&per_page=${this.per_page}&format=json&nojsoncallback=1&privacy_filter=1&user_id=${this.myKey}`;

    this.callImgDate(this.myPhotoUrl);

    this.list.addEventListener("click", (e) => {
      e.preventDefault();

      const imgAuthor = e.target
        .closest(".img-con")
        .querySelector(".img-author");
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

    this.searchBtn.addEventListener("mouseenter", () => {
      this.searchInput.style.width = "200px";
    });

    this.searchBtn.addEventListener("click", (e) => {
      let tag = this.searchInput.value.trim();

      if (tag) {
        const errMsgs = this.searchInput.parentElement.querySelectorAll("p");
        const url = `${this.base}method=${this.methodSearch}&api_key=${this.key}&per_page=${this.per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

        if (errMsgs.length > 0) {
          errMsgs[0].remove();
        }

        this.callImgDate(url);
      } else {
        this.list.innerHTML = "";
        this.list.style.height = "auto";

        const errMsgs = this.searchInput.parentElement.querySelectorAll("p");

        if (errMsgs.length > 0) {
          errMsgs[0].remove();
        }

        const errMsg = document.createElement("p");
        errMsg.append("검색어를 입력하세요");
        this.searchInput.parentElement.append(errMsg);
      }
    });

    this.searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        let tag = this.searchInput.value.trim();

        if (tag) {
          const errMsgs = this.searchInput.parentElement.querySelectorAll("p");
          const url = `${this.base}method=${this.methodSearch}&api_key=${this.key}&per_page=${this.per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

          if (errMsgs.length < 0) {
            errMsgs[0].remove();
          }

          this.callImgDate(url);
        } else {
          this.list.innerHTML = "";
          this.list.style.height = "auto";

          const errMsgs = this.searchInput.parentElement.querySelectorAll("p");

          if (errMsgs.length < 0) {
            errMsgs[0].remove();
          }

          const errMsg = document.createElement("p");
          errMsg.append("검색어를 입력하세요");
          this.searchInput.parentElement.append(errMsg);
        }
      }
    });
  }

  callImgDate(url) {
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        let items = json.photos.photo;
        this.createGallery(items);
        this.imgLoading();
      });
  }

  createGallery(items) {
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

    this.list.innerHTML = result;
  }

  imgLoading() {
    const thumb = document.querySelectorAll(".pic img");
    let len = thumb.length;
    let count = 0;

    thumb.forEach((img) => {
      img.onload = () => {
        count++;
        this.loadBar.style.width = count * 5 + "%";

        if (count == len) this.iso();

        new Anime(loading, {
          prop: "opacity",
          value: 0,
          duration: 500,
          callback: () => {
            setTimeout(() => {
              loading.style.display = "none";
            }, 200);
            this.list.classList.add("on");
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
        buddy.setAttribute(
          "src",
          "https://www.flickr.com/images/buddyicon.gif"
        );
      };
    });
  }

  iso() {
    new Isotope(this.list, {
      itemSelector: ".item",
      columnWidth: ".item",
      transitionDuration: "0.5s",
    });
  }
}
