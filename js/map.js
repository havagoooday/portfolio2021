var container = document.getElementById("map");
var branch_btns = document.querySelectorAll(".branch article a");

var options = {
	center: new kakao.maps.LatLng(33.4513, 126.572),
	level: 4
};

var map = new kakao.maps.Map(container, options);


var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.RIGHT);
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//여러개의 마커를 표시하기 위한 위치와 title 객체 배열
var markerOptions = [
    {
        title: '3호점',
        latlng: new kakao.maps.LatLng(33.4498, 126.574),
        imgSrc: '../img/marker-03.png',
        imageSize: new kakao.maps.Size(40, 53.35),
        imageOption: {offset: new kakao.maps.Point(20, 26.6)},
        btn: branch_btns[2]
    },
    {
        title: '2호점',
        latlng: new kakao.maps.LatLng(33.45285, 126.570941),
        imgSrc: '../img/marker-02.png',
        imageSize: new kakao.maps.Size(40, 53.35),
        imageOption: {offset: new kakao.maps.Point(20, 26.6)},
        btn: branch_btns[1]
    },
    {
        title: '1호점',
        latlng: new kakao.maps.LatLng(33.4509, 126.570667),
        imgSrc: '../img/marker-01.png',
        imageSize: new kakao.maps.Size(40, 53.35),
        imageOption: {offset: new kakao.maps.Point(20, 26.6)},
        btn: branch_btns[0]
    }
]

for (var i = 0; i < markerOptions.length; i ++) {
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imageSize, markerOptions[i].imageOption); 
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerOptions[i].latlng, // 마커를 표시할 위치
        title : markerOptions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });


    (function(index){
        markerOptions[index].btn.onclick = function(e){
            e.preventDefault();

            for(var k=0; k<markerOptions.length; k++){
                markerOptions[k].btn.classList.remove("on");
            }
            markerOptions[index].btn.classList.add("on");

            map.setLevel(2);
            moveTo(markerOptions[index].latlng);
        }
    })(i);

    //kakao.maps.event.addListener(marker, 'click', moveTo(marker.position));
}

function moveTo(target) {
    var moveLatLon = target;
    map.panTo(moveLatLon);
}