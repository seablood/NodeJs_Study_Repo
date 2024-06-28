const express = require("express");
const app = express();
let posts = []; // 메모리(휘발성 데이터)

// req.body를 사용하려면 json 미들웨어를 사용해야한다.
// 사용하지 않으면 undefined로 나옴.
app.use(express.json()); // json 미들웨어 사용 설정

// post요청이 application/x-www-form-urlencoded 인 경우 파싱을 위해 사용.
app.use(express.urlencoded({ extended: true })); // json 미들웨어와 함께 사용

app.get("/", (_, res) => { // '/' get 요청에 대한 함수 설정
  res.json(posts); // 메모리에 존재하는 모든 게시글을 보여줌
});

app.post("/posts", (req, res) => { // '/posts' post 요청에 대한 함수 설정
  console.log(typeof req.body); // request의 body 부분 데이터 콘솔에 출력
  const { title, name, text } = req.body; // body 데이터 할당
  posts.push({ id: posts.length + 1, title, name, text, createdDt: Date() }); // 메모리에 푸시(save)
  res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => { // '/posts/:id' delete 요청에 대한 함수 설정
  const id = req.params.id; // 파라미터의 id 값을 추출하여 할당(문자열)
  const filteredPosts = posts.filter((post) => post.id !== +id); // id값과 일치하지 않는 id를 가진 게시글만 추출
  const isLengthChanged = posts.length !== filteredPosts.length; // 기존 메모리와 필터링된 메모리의 길이 차이 비교
  posts = filteredPosts;
  if (isLengthChanged) { // 길이가 다르면 삭제가 완료가 된 상황
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED"); // 만약 길이가 같다면 변화가 없음
});

app.listen(3000, () => { // 클라이언트 요청 대기
  console.log("welcome board START!");
});
