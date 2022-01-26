const express = require('express') //express를 설치했기 때문에 가져올 수 있다.
const app = express()

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

app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});


app.listen(8080, () => console.log("접속 확인 (ﾉ*･ω･)ﾉ"))