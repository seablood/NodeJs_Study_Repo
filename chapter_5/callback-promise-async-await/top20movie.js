const axios = require("axios");
const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";

axios
    .get(url)
    .then((result) => {
        if(result.status != 200){
            throw new Error("요청에 실패하였습니다!!");
        }
        if(result.data){
            console.log(result);
            return result.data;
        }
        else{
            throw new Error("데이터가 없습니다!!");
        }
    })
    .then((data) => {
        if(!data.articleList || data.articleList.size == 0){
            throw new Error("데이터가 없습니다!!");
        }

        return data.articleList;
    })
    .then((articles) => {
        return articles.map((article, index) => {
            return {title: article.title, rank: index+1};
        })
    })
    .then((result) => {
        for(let movie of result){
            console.log(`[${movie.rank}위] ${movie.title}`);
        }
    })
    .catch((err) => {
        console.error(err);
    });
    