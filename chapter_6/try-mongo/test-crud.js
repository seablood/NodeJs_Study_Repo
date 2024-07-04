const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://dudwnszero99:nodejs@cluster1.k5bjxhc.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster1";

const client = new MongoClient(uri);

async function main(){
    try{
        await client.connect();

        console.log("DB 연결 성공!!");

        const collection = client.db('test').collection('person');

        await collection.insertOne({name: 'Andy', age: 30});
        console.log("문서 추가 완료");

        const document = await collection.find({name: 'Andy'}).toArray();
        console.log("찾은 문서: ", document);

        await collection.updateOne({name: 'Andy'}, {$set: {age: 31}});
        console.log("문서 업데이트 완료");

        const updateDocument = await collection.find({name: 'Andy'}).toArray();
        console.log("찾은 문서: ", updateDocument);

        await client.close();

    } catch (err){
        console.error(err);
    }
}

main();