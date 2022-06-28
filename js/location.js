//key: 	b4aec3e6c21e0e365e584fd6ae9917e3

var gangnam = document.getElementById('map-gangnam');
var options = {
	center: new kakao.maps.LatLng(37.49797742928841, 127.02751396250248),
	draggable: false,
	level: 3,
};

var map = new kakao.maps.Map(gangnam, options);

var hongdae = document.getElementById('map-hongdae');
var options = {
	center: new kakao.maps.LatLng(37.55604537240584, 126.92299340788084),
	draggable: false,
	level: 3,
};

var map = new kakao.maps.Map(hongdae, options); //지도 생성 및 객체 리턴

var nowon = document.getElementById('map-nowon');
var options = {
	center: new kakao.maps.LatLng(37.654666083609655, 127.06048089676263),
	draggable: false,
	level: 3,
};

var map = new kakao.maps.Map(nowon, options); //지도 생성 및 객체 리턴

function setDraggable(draggable) {
	gangnam.setDraggable(draggable);
}
