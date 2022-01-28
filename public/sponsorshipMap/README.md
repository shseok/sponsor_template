# 구현사항

## 라이브러리 사용해서 키워드로 장소검색
- https://apis.map.kakao.com/web/guide/#loadlibrary
- https://apis.map.kakao.com/web/sample/keywordBasic/
    - 해당 라이브러리를 추가하여 장소검색 구현

# Logic
## 후원가게 검색
1. Open API를 사용하여 지역별 소상공인 정보를 가져온다. (test : 경기도)
2. 카카오 맵에서 검색된 정보와 비교하여 일치하는 것을 표시하여 알려준다.

# API
행정구역 코드 (시군구는 시군구코드값) /1page당 최대 1000개 
- 11 : 서울특별시
- 26 : 부산광역시
- 27 : 대구광역시
- 28 : 인천광역시
- 29 : 광주광역시
- 30 : 대전광역시
- 31 : 울산광역시
- 36 : 세종특별자치시
- 41 : 경기도
- 42 : 강원도
- 43 : 충청북도
- 44 : 충청남도
- 45 : 전라북도
- 46 : 전라남도
- 47 : 경상북도
- 48 : 경상남도
- 50 : 제주특별자치도

# Ref
* 실제 구동화면 주소 https://ehdwoKIM.github.io/kakaoMap_API_Test/

* 카카오 DEVTOK 주소 (FAQ) https://devtalk.kakao.com/

* 카카오개발자용 주소 https://developers.kakao.com/

* 카카오 맵 API 주소 https://apis.map.kakao.com/