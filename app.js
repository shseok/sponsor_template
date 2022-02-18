const express = require('express'); //모듈 호출
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());

// 정적파일사용 (css, assts ...)
app.use(express.static(__dirname + "/public")); // 없으면 main에서 log갈 때 에러
app.use(express.static(__dirname + "/public/main"));
app.use(express.static(__dirname + "/public/login"));
app.use(express.static(__dirname + "/public/register_sponsor"));
app.use(express.static(__dirname + "/public/register_sponsored"));
app.use(express.static(__dirname + "/public/sponsorshipMap"));

// 처음 화면이 login 창이 아니라 main?
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
// 앞에 public 생략가능
app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/public/main/index.html')
})

app.use('/login', function (req, resp) {
    resp.sendFile(__dirname + '/public/login/index.html');
});

app.use('/register_sponsor', function (req, resp) {
    resp.sendFile(__dirname + '/public/register_sponsor/main.html');
});

app.use('/register_sponsored', function (req, resp) {
    resp.sendFile(__dirname + '/public/register_sponsored/main.html');
});

app.use('/sponsorshipMap', function (req, resp) {
    resp.sendFile(__dirname + '/public/sponsorshipMap/index.html');
});

app.get('/locationSearch/:locationNum/:limit', async (req, res) => {
    const basicURL = "http://apis.data.go.kr/B553077/api/open/sdsc2/storeListInDong";
    const serviceKey = "urjek0WtO%2FvvB9TbWitwIaRTZvfcfQI5rmMUToR%2FUSEBzoebVuc%2FKGCY28ySbmMmm2QzS9V9IIDD92bdTJ30fw%3D%3D";
    const params = {
        locationNum: req.params.locationNum,
        limit: req.params.limit
    }

    const response = await axios.get(`${basicURL}?divId=signguCd&key=${params.locationNum}&numOfRows=${params.limit}&pageNo=1&type=json&ServiceKey=${serviceKey}`).catch(e => console.log(e));

    // console.log(response);

    res.send(response.data);
    // res.json(response.data.body);
})

// fetchData();

// async function fetchData() {
//     const response = await axios.get('/public/excel_to_json/data.json').catch(e => console.log(e));

//     console.log(response);

//     return response;
// }


// -----------------------------------------------------------

app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.listen(8080, () => console.log("접속 확인 (ﾉ*･ω･)ﾉ"))