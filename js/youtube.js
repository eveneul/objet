// class Youtube {
//   constructor(frame, opt) {
//     this.frame = document.querySelector(frame);
//     this.key = opt.api_key;
//     this.playlistId = opt.playlistId;
//     this.num = opt.num; // 비디오 호출 개수
//     this.url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${this.key}&playlistId=${this.playlistId}&maxResults=${this.num}`;

//     this.youtubeVid(this.url);

//     document.body.addEventListener("click", (e) => {
//       const pop = document.querySelector(".pop");
//       if (pop) {
//         const close = pop.querySelector("span");
//         if (e.target == close) pop.remove();
//       }
//     });

//     this.frame.addEventListener("click", (e) => {
//       e.preventDefault();

//       if (!e.target.closest("a")) return;

//       const vidId = e.target.parentElement.getAttribute("data-vid");

//       let pop = document.createElement("figure");
//       pop.classList.add("pop");
//       pop.innerHTML = `
//   <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen></iframe>
//   <span class="btnClose">CLOSE</span>
//   `;

//       document.body.append(pop);
//     });
//   }

//   youtubeVid(url) {
//     fetch(url)
//       .then((data) => {
//         return data.json();
//       })
//       .then((json) => {
//         let items = json.items;
//         console.log(items);

//         let result = "";

//         items.map((item) => {
//           result += `
//             <article>
//               <a href="#" data-vid=${item.snippet.resourceId.videoId} class="vid">
//                 <img src=${item.snippet.thumbnails.high.url} />
//             </a>
//             <div class="vid-con">
//               <h2>${item.snippet.title}</h2>
//             </div>
//           </article>

//       `;
//         });

//         this.frame.innerHTML = result;
//       });
//   }
// }

class Youtube {
  constructor(frame, opt) {
    this.videoWrap = document.querySelector(frame);
    this.key = opt.api_key;
    this.playlistId = opt.playListId;
    this.num = opt.num; // 비디오 호출 개수
    this.url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${this.key}&playlistId=${this.playlistId}&maxResults=${this.num}`;

    this.youtubeVid(this.url);

    document.body.addEventListener("click", (e) => {
      const pop = document.querySelector(".pop");
      if (pop) {
        const close = pop.querySelector("span");
        if (e.target == close) pop.remove();
      }
    });

    this.videoWrap.addEventListener("click", (e) => {
      e.preventDefault();

      if (!e.target.closest("a")) return;

      const vidId = e.target.parentElement.getAttribute("data-vid");

      let pop = document.createElement("figure");
      pop.classList.add("pop");
      pop.innerHTML = `
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen></iframe>
  <span class="btnClose">CLOSE</span>
  `;

      document.body.append(pop);
    });
  }

  youtubeVid(url) {
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        let items = json.items;
        console.log(items);

        let result = "";

        items.map((item) => {
          result += `
                <article>
            <a href="#" data-vid=${item.snippet.resourceId.videoId} class="vid">
              <img src=${item.snippet.thumbnails.high.url} />
            </a>
            <div class="vid-con">
              <h2>${item.snippet.title}</h2>
            </div>
            <div class="vid-playIcon">
              <div>
                <i class="fa-solid fa-play"></i>
              </div>
            </div>
          </article>
    
      `;
        });

        this.videoWrap.innerHTML = result;
      });
  }
}
