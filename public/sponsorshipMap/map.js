const markers = [];
let userLocation = '';

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

    geocoder.coord2RegionCode(currentPos.La, currentPos.Ma, getResult);

    // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
    map.panTo(currentPos);

    // 마커 생성
    var marker = new kakao.maps.Marker({
        position: currentPos
    });

    markers.push(marker);

    // 기존에 마커가 있다면 제거
    marker.setMap(null);
    marker.setMap(map);

};

function getResult(result, status) {
    userLocation = result[0].address_name;
    getNearbyUserLocation(userLocation.split(' ')[0]);
}

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

// ----------------------------------------- 키워드로 장소검색 -----------------------------------------
const searchBtn = document.querySelector('.search-btn');
const searchContent = document.querySelector('.search-query');
const form = document.querySelector('.input-group');
const locationList = document.getElementById('location-list');
let searchValue = '';

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    locationList.innerHTML = ``;

    const inputDoc = e.target.querySelector('.search-query');
    searchValue = inputDoc.value;

    if (searchValue == '') {
        alert("다시 검색해주세요 :)"); // ㄴ
    } else {
        // 키워드로 장소를 검색합니다
        ps.keywordSearch(searchValue, placesSearchCB);
    }
    // 기존의 마크를 모두 삭제
    markers.map(marker => marker.setMap(null));
    console.log(markers);

    inputDoc.value = '';
    inputDoc.focus();
})

// console.log(searchValue); null

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);

        createDataList(data);
    }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {

    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
    });

    markers.push(marker);

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}

function createDataList(results) {
    results.map(location => {
        const elem = document.createElement("LI");
        elem.classList.add('searched-location');
        elem.innerHTML = `<div class="result-inner">
            주소: ${location.road_address_name} </br>
            분류: ${location.category_name} </br>
            연락처: ${location.phone}</br>
            </div>
        `;
        console.log(elem);

        locationList.appendChild(elem);
    });
}

// ----------------------------------------- 좌표로 주소 얻어내기-----------------------------------------

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var addrMarker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
    addrInfoWindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

            var content = '<div class="bAddr">' +
                '<span class="addr-title">법정동 주소정보</span>' +
                detailAddr +
                '</div>';

            // 마커를 클릭한 위치에 표시합니다 
            addrMarker.setPosition(mouseEvent.latLng);
            addrMarker.setMap(map);

            // markers.push(addrMarker);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            addrInfoWindow.setContent(content);
            addrInfoWindow.open(map, addrMarker);
        }
    });
});

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'idle', function () {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {

    if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');

        for (var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                infoDiv.innerHTML = result[i].address_name;
                break;
            }
        }
    }
}

// ----------------------------------------- 현재 위치에서 얻은 주소로 open API의 행정동 단위 상가업소 조회 -----------------------------------------

async function queryNearbyUserLocation(locationNum) {
    const limit = 5; // 한번에 최대 1000개의 가게
    const response = await fetch(`http://localhost:8080/locationSearch/${locationNum}/${limit}`);
    // await을 안쓰면 promise객체 반환(pending fullfiled) -- 이후 then
    // await 쓰면 response객체 반환 -- 이후 .json() 변환
    console.log(response);

    return response;
}

async function getNearbyUserLocation(location) {

    locationNum = handleLocationToNum(location);

    try {
        const response = await queryNearbyUserLocation(locationNum);

        response.json().then(
            data => console.log(data.body.items)
        )
        // response.then(res => res.json()).then(json => console.log(json)); fetch해올때부터 await안 쓰면 사용
    } catch (error) {
        console.log(error);
    }
}

function handleLocationToNum(location) {

    console.log(location);
    switch (location) {
        case '서울특별시':
            return 11;
        case '부산광역시':
            return 26;
        case '대구광역시':
            return 27;
        case '인천광역시':
            return 28;
        case '광주광역시':
            return 29;
        case '대전광역시':
            return 30;
        case '울산광역시':
            return 31;
        case '세종특별자치시':
            return 36;
        case '경기도':
            return 41;
        case '강원도':
            return 42;
        case '충청북도':
            return 45;
        case '충청남도':
            return 44;
        case '전라북도':
            return 45;
        case '전라남도':
            return 46;
        case '경상북도':
            return 47;
        case '경상남도':
            return 48;
        case '제주특별자치도':
            return 50;
        default:
            return 'error';
    }

}

// 11 : 서울특별시
// 26 : 부산광역시
// 27 : 대구광역시
// 28 : 인천광역시
// 29 : 광주광역시
// 30 : 대전광역시
// 31 : 울산광역시
// 36 : 세종특별자치시
// 41 : 경기도
// 42 : 강원도
// 43 : 충청북도
//  44 : 충청남도
// 45 : 전라북도
// 46 : 전라남도
// 47 : 경상북도
// 48 : 경상남도
// 50 : 제주특별자치도

