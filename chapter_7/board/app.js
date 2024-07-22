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

app.get("/", async (req, res) => {
    const page = req.query.page || 1;
    const search = req.query.search || "";

    try{
        const [posts, paginator] = await postService.list(collection, search, page);
        console.log(paginator.hasNext);

        res.render("home", {title: "테스트 게시판", search, paginator, posts});
    } catch (err){
        console.log(err);

        res.render("home", {title: "테스트 게시판"});
    }
});

app.get("/write", (_, res) => {
    res.render("write", {title: "테스트 게시판"});
});

app.get("/detail/:id", async (req, res) => {
    const id = req.params.id;
    const result = await postService.getDetailPost(collection, id);
    res.render("detail", {title: "테스트 게시판", post: result.value});
});

app.post("/write", async (req, res) => {
    const post = req.body;
    const result = await postService.writeService(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});

app.post("/check-password", async (req, res) => {
    const {id, password} = req.body;

    const post = await postService.getPostByIdAndPassword(collection, {id, password});

    if(!post){
        res.status(404).json({isExist: false});
    }
    else{
        res.json({isExist: true});
    }
});