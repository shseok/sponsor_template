const mapContainer = document.getElementById('map') // 지도를 표시할 div
const mapOption = {
    center: new kakao.maps.LatLng(37.56646, 126.98121), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
    mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
};

// 지도를 생성한다
const map = new kakao.maps.Map(mapContainer, mapOption);

function locationLoadSuccess(pos) {
    // 현재 위치 받아오기
    const currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

    // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
    map.panTo(currentPos);

    // 마커 생성
    const marker = new kakao.maps.Marker({
        position: currentPos
    });

    // 기존에 마커가 있다면 제거
    marker.setMap(null);
    marker.setMap(map);
};

function locationLoadError(pos) {
    alert('위치 정보를 가져오는데 실패했습니다.');
};

// 위치 가져오기 버튼 클릭시
function getCurrentPosBtn() {
    navigator.geolocation.getCurrentPosition(locationLoadSuccess, locationLoadError);
};

const locationBtn = document.querySelector('.location-btn');
locationBtn.addEventListener('click', () => {
    getCurrentPosBtn();
})

