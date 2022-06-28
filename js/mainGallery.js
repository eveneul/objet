const gallery = document.querySelector('.mainGallery .swiper-wrapper');
const prevBtn = document.querySelector('.swiper-button-prev');
const nextBtn = document.querySelector('.swiper-button-next');

const key = 'c242a84b957d53602081a6a1c4adef5d';
const base = 'https://www.flickr.com/services/rest/?';
const per_page = 50;
const methodMyPhoto = 'flickr.people.getPhotos';
const myKey = '195703740@N02';
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
		});
}

function createGallery(items) {
	let result = '';
	items.forEach((item) => {
		let imgSrcBig = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`;

		result += `
          <article class="swiper-slide">
            <img
              src=${imgSrcBig}
              alt="main gallery image"
            />
          </article>
      `;
	});

	gallery.innerHTML = result;
}

const swiper = new Swiper(gallery, {
	navigation: {
		nextEl: nextBtn,
		prevEl: prevBtn,
	},
});

const test = gallery.querySelector('.images');
console.log(test);
