const {MongoClient} = require("mongodb");

const uri = "mongodb+srv://dudwnszero99:nodejs@cluster1.k5bjxhc.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster1";

module.exports = function (callback) { // MongoDB Connection Client를 반환
    return MongoClient.connect(uri, callback);
}