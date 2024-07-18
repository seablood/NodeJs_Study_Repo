const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");

app.engine("handlebars", 
    handlebars.create({
        helpers: require("./configs/handlebars-helpers")
    }).engine
); // 템플릿 엔진 설정(핸들바)
app.set("view engine", "handlebars"); // 웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 뷰 디렉토리 설정
app.use(express.json()); // req.body 사용하기 위한 설정
app.use(express.urlencoded({extended: true}));

let collection;
app.listen(3000, async () => {
    console.log("Start Server");
    const mongoClient = await mongodbConnection();
    collection = mongoClient.db("test").collection("post");
    console.log("MongoDB Connection Success");
});

app.get("/", (_, res) => {
    res.render("home", {title: "테스트 게시판"});
});

app.get("/write", (_, res) => {
    res.render("write", {title: "테스트 게시판"});
});

app.get("/detail/:id", (_, res) => {
    res.render("detail", {title: "테스트 게시판"});
});

app.post("/write", async (req, res) => {
    const post = req.body;
    const result = await postService.writeService(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});