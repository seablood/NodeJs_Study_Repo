const express = require("express"); // ❶ express 모듈 로딩
const app = express(); // ❷ express 초기화 및 할당
const port = 3000;

// prettier-ignore
app.get("/", (req, res) => { // ❸ "/"에 매핑된 get 메소드 지정
  res.set({ "Content-Type": "text/html; charset=utf-8" }); // ➍ 헤더 설정
  res.end("헬로 Express");
});

// prettier-ignore
app.listen(port, () => { // ➎ 
  console.log(`START SERVER : use ${port}`);
});
