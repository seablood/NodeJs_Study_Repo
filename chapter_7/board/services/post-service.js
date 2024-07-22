const paginator = require("../utils/paginator");
const {ObjectId} = require("mongodb");

async function writeService(collection, post){
    post.hits = 0;
    post.createdDate = new Date().toISOString();

    return await collection.insertOne(post);
}

async function list(collection, search, page){
    const perPage = 10;
    const query = {title: new RegExp(search, "i")}; // 정규식을 이용한 몽고 디비 쿼리 생성

    const cursor = collection.find(query, {limit: perPage, skip: (page-1)*perPage}).sort({
        createdDate: -1, 
    }); // 쿼리 & 옵션을 이용한 디비 검색

    const totalCount = await collection.count(query);
    const posts = await cursor.toArray();

    const paginatorObj = paginator({totalCount, page, perPage: perPage});

    return [posts, paginatorObj];
}

const projectionObj = {
    projection: {
        password: 0, 
    }
};

async function getDetailPost(collection, id){
    const objectId = ObjectId(id);
    return await collection.findOneAndUpdate({_id: objectId}, {$inc: {hits: 1}}, projectionObj);
}

async function getPostByIdAndPassword(collection, {id, password}){
    const objectId = ObjectId(id);
    return await collection.findOne({_id: objectId, password: password});
}

module.exports = {
    list, 
    writeService, 
    getDetailPost, 
    getPostByIdAndPassword, 
};