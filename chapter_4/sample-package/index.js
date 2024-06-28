console.log("require로 모듈을 불러오면 실행");

module.exports = {
    add: (a, b) => a+b, 
    sub: (a, b) => a-b, 
    mul: (a, b) => a*b, 
    div: (a, b) => a/b
}