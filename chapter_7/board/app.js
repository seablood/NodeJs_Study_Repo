const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");
const {ObjectId} = require("mongodb");

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
    const mongoClient = await mongodbConnection(); // 몽고디비 연결
    collection = mongoClient.db("test").collection("post"); // 컬렉션 로딩
    console.log("MongoDB Connection Success");
});

app.get("/", async (req, res) => { // 메인 페이지 라우팅
    const page = req.query.page || 1;
    const search = req.query.search || "";

    try{
        const [posts, paginator] = await postService.list(collection, search, page);

        res.render("home", {title: "테스트 게시판", search, paginator, posts});
    } catch (err){
        console.log(err);

        res.render("home", {title: "테스트 게시판"});
    }
});

app.get("/write", (_, res) => { // 글 작성 페이지 라우팅
    res.render("write", {title: "테스트 게시판", mode: "create"});
});

app.get("/detail/:id", async (req, res) => { // 게시글 상세 페이지 라우팅
    const id = req.params.id;
    const result = await postService.getDetailPost(collection, id);
    res.render("detail", {title: "테스트 게시판", post: result.value});
});

app.post("/write", async (req, res) => { // 게시글 등록 POST 요청 라우팅
    const post = req.body;
    const result = await postService.writeService(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});

app.post("/check-password", async (req, res) => { // 패스워드 인증 여부 확인
    const {id, password} = req.body;

    const post = await postService.getPostByIdAndPassword(collection, {id, password});

    if(!post){
        res.status(404).json({isExist: false});
    }
    else{
        res.json({isExist: true});
    }
});

app.get("/modify/:id", async (req, res) => { // 게시글 수정 페이지 라우팅
    const principal = req.query.principal || 0;
    if(principal === 0){
        res.redirect("/");
    }
    else{
        const post = await postService.getPostById(collection, req.params.id);
        res.render("write", {title: "테스트 게시판", mode: "modify", post: post});
    }
});

app.post("/modify", async (req, res) => { // 게시글 수정 POST 요청 라우팅
    const {id, title, writer, password, content} = req.body;
    const post = {
        title, 
        writer, 
        password, 
        content, 
        createdDate: new Date().toISOString(), 
    };

    try{
        const result = await postService.updatePost(collection, id, post);

        if(result.ok === 1){
            console.log("수정에 성공하였습니다.");
        }
        else{
            console.log("수정에 실패하였습니다.");
        }
    } catch (err){
        console.log(err);
        res.redirect(`/detail/${id}`);
    } finally{
        res.redirect(`/detail/${id}`);
    }
});

app.delete("/delete", async (req, res) => { // 게시글 삭제 DELETE 요청 라우팅
    const {id, password} = req.body;

    try{
        const data = await collection.deleteOne({_id: ObjectId(id), password: password});

        if(data.deletedCount !== 1){
            console.log("삭제 실패");
            res.json({isSuccess: false});
        }
        else{
            console.log("삭제 성공");
            res.json({isSuccess: true});
        }
    } catch (err){
        console.log("삭제 실패");
        res.json({isSuccess: false});
    }
});

app.post("/write-comment", async (req, res) => { // 특정 게시글 댓글 추가 POST 요청 라우팅
    const {id, name, password, comment} = req.body;
    const post = await postService.getPostById(collection, id);
    
    if(post.comments){
        post.comments.push({
            idx: post.comments.length + 1, 
            name, 
            password, 
            comment, 
            createdDate: new Date().toISOString(), 
        });
    }
    else{
        post.comments = [{
            idx: 1, 
            name, 
            password, 
            comment, 
            createdDate: new Date().toISOString(), 
        }];
    }

    console.log(post);

    try{
        const result = await postService.updatePost(collection, id, post);

        if(result.ok === 1){
            console.log("댓글 추가 완료");
        }
        else{
            console.log("댓글 추가 오류");
        }
    } catch (err){
        console.log(err);
    } finally{
        res.redirect(`/detail/${id}`);
    }
});

app.delete("/delete-comment", async (req, res) => {
    const {id, idx, password} = req.body;

    const result = await collection.findOne({
        _id: ObjectId(id), 
        comments: {$elemMatch: {idx: parseInt(idx), password}}, 
    }, postService.projectionObj);

    if(!result){
        res.json({isSuccess: false});
    }
    else{
        result.comments = result.comments.filter((comment) => {comment.idx != +idx});
        console.log(result);
        await postService.updatePost(collection, id, result);
        res.json({isSuccess: true});
    }
});