function waitOneSeconds(msg){
    return new Promise((resolve, _) => {
        setTimeout(() => resolve(`${msg}`), 1000);
    })
}

async function countOneToTen(){
    for(let x of [...Array(10).keys()]){
        let result = await waitOneSeconds(`${x+1}초 대기중... `);
        console.log(result);
    }
}

countOneToTen();