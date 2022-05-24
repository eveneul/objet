// key: AIzaSyAc8uCAQs_3ZURzIg-VEZxbaTOW1TlqLlw
// playlist: PLUzA4Nj5MAHHx5opxtILa4cL_UNqlRHsj
// url: https://www.googleapis.com/youtube/v3/playlistItems
// maxResults = 5 // 동영상 호출 개수

const videoWrap = document.querySelector(".con");
const key = "AIzaSyAc8uCAQs_3ZURzIg-VEZxbaTOW1TlqLlw";
const playlistId = "PLUzA4Nj5MAHHx5opxtILa4cL_UNqlRHsj";
const num = 6; // 비디오 호출 개수
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

youtubeVid(url);

function youtubeVid(url) {
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
          </article>
    
      `;
      });

      videoWrap.innerHTML = result;
    });
}

document.body.addEventListener("click", (e) => {
  const pop = document.querySelector(".pop");
  if (pop) {
    const close = pop.querySelector("span");
    if (e.target == close) pop.remove();
  }
});

videoWrap.addEventListener("click", (e) => {
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
