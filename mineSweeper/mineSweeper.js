//html id값 class 값 연결
let btn_play = document.querySelector("#play");
let row = document.querySelector("#row");
let col = document.querySelector("#col");
let mine = document.querySelector("#mine");
let table = document.querySelector(".game-board-body");
let timer = document.querySelector(".game-board-timer");

//table 태그에 게임판 그림
function setBoard(rowNum, colNum) {
    // 게임판 상태를 기록할 행렬 생성
    let boardMatrix = [];
    for (let i = 0; i < rowNum; i++) {
        //tr 태그랑 id 값 설정후 tbody 태그에 추가함
        let tr = document.createElement("tr");
        tr.id = "board-row-" + Number(i + 1);
        table.append(tr);
        let boardVector = [];
        boardMatrix.push(boardVector);
        // td 태그 id 값 설정후 tr 테그에 저장
        for (let j = 0; j < colNum; j++) {
            let td = document.createElement("td");
            td.id = "board-col-" + Number(j + 1);
            tr.appendChild(td);
            boardVector.push(0);
        }
    }
    console.log(boardMatrix);
    return boardMatrix;
}

// 랜덤값 범위 지정 함수
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 지뢰를 랜덤으로 배치해줌
 * @param boardMatrix 데이터를 따로 다룰 행렬 리스트
 * @param mineNum 지뢰 개수
 * @param rowNum 열 개수
 * @param colNum 행개수
 */
function setRandomMine(boardMatrix, mineNum, rowNum, colNum) {
    let size = rowNum * colNum;
    // 빈 리스틀 만듬
    let randFill = Array(size)
        .fill(0)
        .map(function (val, idx) {
            return idx + 1;
        });
    let shuffle = [];
    while (randFill.length >size-mineNum) {
        let popVal = randFill.splice(Math.floor(Math.random() * randFill.length), 1)[0];
        shuffle.push(popVal);
    }
    console.log(shuffle);
    for (let i = 0; i < shuffle.length; i++) {

        let tRow = Math.floor(shuffle[i] / rowNum)%rowNum;
        let tCol = shuffle[i] % rowNum;
        console.log(tRow, tCol);
        boardMatrix[tRow][tCol] = 'x';
        table.children[tRow].children[tCol].textContent = 'x';

    }
}

/**
 *
 * @param boardMatrix 지뢰 행렬을 관리하기 위해 따로 리스트를 선언
 * html 에 table 태그를 접근하고 싶으면 table.children[인덱스].children[인덱스] 으로 접근해야됨
 * @param colNum 행번호
 * @param rowNum 열번호
 * @param mineNum 지뢰개수
 */
// 지뢰 감지 함수
function checkMine(boardMatrix,colNum,rowNum,mineNum){
    // 현재 내위치를 기준으로 지뢰가 있을수 있는 방향 8가지 경우의수
    let direct = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
    let mine = mineNum ;
    let noMineNum = (colNum*rowNum)-mine;
    for (let i = 0; i < colNum; i++) {
        for (let j = 0; j < rowNum; j++) {
            // 지뢰개수보다 지뢰가 없는개수가 더 많을때
            // 지뢰가 있는 주변만 확인하여 계산을 줄임
            if (noMineNum>mine){
                // 지뢰만 있는 위치를 찾고 그 주변 8부분을 탐색
                if (boardMatrix[i][j]==="x"){
                    for (let k = 0; k <8; k++) {
                        // direct 8방향 위,아래,좌우,대각선 값을 하나하나 꺼내서 확인함
                        // 즉 내위치 주변을 확인함
                        let x = direct[k][0];
                        let y = direct[k][1];
                        // 지뢰가 내 위치를 벗어날경우
                        if ((0<=x+i && x+i<rowNum) && (0<=y+j && y+j<colNum)){
                            // 내 위치를 기준으로 8방향을 돌면서 지뢰가 없는경우
                            // 즉 내 위치를 기준으로 주변에 지뢰가 없는지 확인
                            if(boardMatrix[i+x][j+y]!=="x"){
                                // 지뢰가 없는데 해당 좌표가 빈값일때
                                if (table.children[i+x].children[j+y].textContent===""){
                                    // 초기값으로 1지정
                                    table.children[i+x].children[j+y].textContent="1";
                                }
                                else{
                                    // 지뢰가 겹쳤을때
                                    // 선택한 위치에서 text 를 가져와 number 로 바꾼뒤 1을 더함
                                    // 다시 string 으로 바꿔서 text 로 지정
                                    let currentMine = parseInt(table.children[i+x].children[j+y].textContent);
                                    currentMine+=1;
                                    table.children[i+x].children[j+y].textContent=String(currentMine);

                                }
                            }
                        }
                    }
                }
            }
            // 지뢰 개수가 더 많을때
            // 지뢰가 없는 부분만 확인하여 계산을 줄임
            else{
                // 지뢰가 비어있을때
                if (boardMatrix[i][j]===0){
                    for (let l = 0; l < 8; l++) {
                        let x = direct[l][0];
                        let y = direct[l][1];
                        // 지뢰가 내 위치를 벗어날경우
                        if ((0<=x+i && x+i<rowNum) && (0<=y+j && y+j<colNum)){
                            // 내 주변에 지뢰가 있는지 확인
                            if(boardMatrix[i+x][j+y]==="x"){
                                // 내주변에 지뢰가 있는데 지뢰가 최초로 발견될경우 text 값을 1 로 지정
                                if (table.children[i].children[j].textContent===""){
                                    // table.children[i]... html 에 table 태그를 직접 가져옴
                                    table.children[i].children[j].textContent="1";
                                }
                                // 이미 지뢰가 발견된경우 현재 text 값을 가져와서 Number 로 만듬
                                // Number 로만든후 1을더함 => 다시 String 으로 바꾼후 text 로 지정
                                else{
                                    let currentMine = parseInt(table.children[i].children[j].textContent);
                                    currentMine+=1;
                                    table.children[i].children[j].textContent=String(currentMine);


                                }
                            }
                        }
                    }
                }
            }

        }
    }
}
// play 버튼을 눌렀을때
btn_play.addEventListener("click", function (event) {
    let rowNum = parseInt(row.value);
    let colNum = parseInt(col.value);
    let mineNum = parseInt(mine.value);
    timer.colSpan = rowNum;
    let boardMatrix = setBoard(rowNum, colNum);
    console.log(boardMatrix);
    setRandomMine(boardMatrix, mineNum, rowNum, colNum);
    console.log(boardMatrix);
    checkMine(boardMatrix,colNum,rowNum,mineNum);
    console.log(boardMatrix)
})
