/*
let mainScreen = document.querySelector("#main-screen");
let timeout;
let startTime;
let endTime;
mainScreen.addEventListener("click",()=>{
    console.log(mainScreen.className)
    if(mainScreen.classList.contains("init")){

        mainScreen.classList.remove("init");
        mainScreen.classList.add("wait");
        let time = Math.random()*5000+1000;
        timeout = setTimeout(()=>{
            startTime = new Date();
            mainScreen.click();
        },time);
        if(!startTime){
            clearTimeout(timeout)
        }
        else{

            mainScreen.textContent = "초록색이 되면 클릭하세요"
        }

    }
    else if (mainScreen.classList.contains("wait")){
        mainScreen.classList.remove("wait");
        mainScreen.classList.add("stop");
        mainScreen.textContent = "클릭하세요"


    }
    else if (mainScreen.classList.contains("stop")){
        endTime = new Date();
        console.log(endTime-startTime);
        mainScreen.textContent = "너의 기록 "+(endTime-startTime)+"s\n클릭해서 시작하세요";
        mainScreen.classList.remove("stop");
        mainScreen.classList.add("init");
    }
});


*/
let a;
console.log("d");
setTimeout(()=>{
    a = 1;
    console.log("3");
    console.log(a);
},1000)
console.log(a);
console.log("1");