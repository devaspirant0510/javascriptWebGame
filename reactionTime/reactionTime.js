let mainScreen = document.querySelector("#main-screen");
let timeout;
let startTime;
let endTime;

function changeScreen(before, now) {
    mainScreen.classList.remove(before);
    mainScreen.classList.add(now);
}

mainScreen.addEventListener("click", () => {
    console.log(mainScreen.className)
    // 초록색 화면 클릭해야되는 부분
    if (mainScreen.className === "wait") {
        console.log("stop");
        if(!startTime){
            clearTimeout(timeout);
            mainScreen.textContent = "어이.. 천천히 하라구..."
            changeScreen("wait","stop");
        }
        else{

            mainScreen.textContent = "클릭하세요";
            changeScreen("wait", "stop");
        }



    }
    // 파란색 화면 나의 반응속도 보여주고 게임을 시작함
    else if (mainScreen.className === "stop") {
        console.log("init");
        endTime = new Date();
        let record = endTime - startTime;
        console.log(endTime-startTime);
        // null 처리를 꼭 해야 잘못클릿했을때 !startTime 루프에 돌아서 판단함
        startTime = null;
        endTime = null;
        mainScreen.textContent = `당신의 기록은 ???\n${record}s \n 클릭하여 시작하세요`;
        changeScreen("stop", "init");


    }
    // 빨강색 화면 일정시간이 지난후 화면 전환
    else if (mainScreen.className === "init") {
        console.log("wait");
        mainScreen.textContent = "초록색이 되면 클릭하세요";
        changeScreen("init", "wait");
        let randTime = Math.random()*4500+1500;
        timeout = setTimeout(()=>{
            startTime = new Date();
            mainScreen.click();
        },randTime);


    }
});


