async function writeService(collection, post){
    post.hits = 0;
    post.createdDate = new Date().toISOString();

    return await collection.insertOne(post);
}

module.exports = {
    writeService, 
};