const axios = require("axios");

async function getTop20Movie(){
    const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";

    try{
        const result = await axios.get(url);

        if(result.status != 200){
            throw new Error("불러올 수 없습니다!!");
        }

        const {data} = result;

        if(!data.articleList || data.articleList.size == 0){
            throw new Error("데이터가 없습니다!!");
        }
        
        const articles = data.articleList.map((article, index) => {
            return {title: article.title, rank: index+1};
        });

        for(let movie of articles){
            console.log(`[${movie.rank}위] ${movie.title}`);
        }
    } catch (err){
        console.error(err);
    }
}

getTop20Movie();