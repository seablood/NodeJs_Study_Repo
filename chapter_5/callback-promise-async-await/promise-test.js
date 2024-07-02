const DB = [];

function saveDB(user){
    const oldDBLen = DB.length;
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return new Promise((resolve, reject) => {
        if(oldDBLen < DB.length){
            resolve(user); // 성공 시 유저 정보 반환
        }
        else{
            reject(new Error("save DB Error!!"));
        }
    })
}

function sendEmail(user){
    console.log(`email to ${user.email}`);
    return new Promise((resolve) => {
        resolve(user);
    })
}

function getResult(user){
    return new Promise((resolve) => {
        resolve(`success register ${user.name}`);
    })
}

function registerByPromise(user){
    const result = saveDB(user)
                    .then(sendEmail)
                    .then(getResult)
                    .catch(error => new Error(error))
                    .finally(() => console.log("완료")); // 비동기 호출이지만 Promise를 이용해 순서를 보장함
    console.log(result); // 아직 완료되지 않은 상태에서 불리므로 지연상태로 돌입
    return result;
}

const user = {email: "abcd@naver.com", password: "1234", name: "andy"};
const result = registerByPromise(user);
result.then(console.log);