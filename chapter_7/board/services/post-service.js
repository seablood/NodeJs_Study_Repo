const paginator = require("../utils/paginator");
const {ObjectId} = require("mongodb");

async function writeService(collection, post){ // 게시글 추가 함수
    post.hits = 0;
    post.createdDate = new Date().toISOString();

    return await collection.insertOne(post);
}

async function list(collection, search, page){ // 특정 게시글 모두 찾기 및 페이징 처리 함수
    const perPage = 10;
    const query = {title: new RegExp(search, "i")}; // 정규식을 이용한 몽고 디비 쿼리 생성

    const cursor = collection.find(query, {limit: perPage, skip: (page-1)*perPage}).sort({
        createdDate: -1, 
    }); // 쿼리 & 옵션을 이용한 디비 검색

    const totalCount = await collection.count(query);
    const posts = await cursor.toArray();

    const paginatorObj = paginator({totalCount, page, perPage: perPage}); // 페이징 처리

    return [posts, paginatorObj];
}

const projectionObj = { // 프로젝션(투영) 처리 -> 패스워드 제외
    projection: {
        password: 0, 
    }
};

async function getDetailPost(collection, id){ // 상세 페이지 로드용 함수 -> 조회수 증가
    const objectId = ObjectId(id);
    return await collection.findOneAndUpdate({_id: objectId}, {$inc: {hits: 1}}, projectionObj);
}

async function getPostByIdAndPassword(collection, {id, password}){ // id 및 패스워드를 이용한 특정 게시글 찾기 함수
    const objectId = ObjectId(id);
    return await collection.findOne({_id: objectId, password: password});
}

async function getPostById(collection, id){ // id를 이용한 특정 게시글 찾기 함수
    const objectId = ObjectId(id);
    return await collection.findOne({_id: objectId}, projectionObj);
}

async function updatePost(collection, id, post){ // 특정 게시글 업데이트 함수
    const objectId = ObjectId(id);
    const data = {
        $set: {
            ...post, 
        }
    };

    return await collection.findOneAndUpdate({_id: objectId}, data, projectionObj);
}

module.exports = {
    list, 
    writeService, 
    getDetailPost, 
    getPostByIdAndPassword, 
    getPostById, 
    updatePost, 
};