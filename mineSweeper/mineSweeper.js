//html id값 class 값 연결
let btn_play = document.querySelector("#play");
let row = document.querySelector("#row");
let col = document.querySelector("#col");
let mine = document.querySelector("#mine");
let table = document.querySelector(".game-board-body");
let timer = document.querySelector(".game-board-timer");
let result = document.querySelector("#result");
// 입력값 Number 로 변환

let rowNum;
let colNum;
let mineNum;

let checkMatrix;
let boardMatrix;

let gameState = true;

//table 태그에 게임판 그림
function setBoard() {
    let size = rowNum * colNum;
    console.log(size);
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
            td.addEventListener("contextmenu", function (event) {
                    event.preventDefault();
                    if (gameState === false) {
                        return;
                    }
                    let menuRow = Array.prototype.indexOf.call(event.currentTarget.parentNode.parentNode.children, tr);
                    let menuCol = Array.prototype.indexOf.call(event.currentTarget.parentNode.children, td);
                    if (event.currentTarget.textContent === "!") {
                        event.currentTarget.textContent = "?";
                    } else if (event.currentTarget.textContent === '?') {
                        if (boardMatrix[menuRow][menuCol] === 0) {
                            event.currentTarget.textContent = "";
                        } else {

                            event.currentTarget.textContent = String(boardMatrix[menuRow][menuCol]);
                        }
                    } else {

                        event.currentTarget.textContent = "!";
                    }


                }
            )
            td.addEventListener("click", function (event) {
                    if (gameState === false) {
                        return;
                    }
                    let menuRow = Array.prototype.indexOf.call(event.currentTarget.parentNode.parentNode.children, tr);
                    let menuCol = Array.prototype.indexOf.call(event.currentTarget.parentNode.children, td);
                    if (event.target.textContent === 'x') {
                        result.textContent = "실패ㅠㅠㅠㅠㅠㅠ"
                        gameState = false
                        event.target.textContent = '펑';
                    } else {
                        event.target.textContent = boardMatrix[menuRow][menuCol];
                        console.log(checkMatrix);
                        openBoard(boardMatrix, checkMatrix, menuRow, menuCol);
                        updateOpenBoardUI(boardMatrix, checkMatrix);
                    }

                }
            )
            td.id = "board-col-" + Number(j + 1);
            tr.appendChild(td);
            boardVector.push(0);
        }
    }
    console.log(boardMatrix);
    return boardMatrix;
}

// 랜덤값 범위 지정 함수
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
function openBoard(boardMatrix, checkMatrix, row, col) {
    let direction = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
    if (checkMatrix[row][col]) {
        if (boardMatrix[row][col]==="x"){
            checkMatrix[row][col]=false;
            return;
        }

        return;

    } else {

        checkMatrix[row][col] = true;

        for (let i = 0; i < direction.length; i++) {
            let checkRow = row - direction[i][0];
            let checkCol = col - direction[i][1];
            if ((0 <= checkRow && checkRow < rowNum) && (0 <= checkCol && checkCol < colNum)) {
                openBoard(boardMatrix, checkMatrix, checkRow, checkCol);
            }

        }


    }
}

function updateOpenBoardUI(boarMatrix, checkMatrix) {
    for (let i = 0; i < rowNum; i++) {
        for (let j = 0; j < colNum; j++) {
            if (checkMatrix[i][j]) {

                table.children[i].children[j].classList.add("opened");
                if (boarMatrix[i][j] !== 0) {
                    table.children[i].children[j].textContent = boarMatrix[i][j];
                }
            }

        }

    }

}

/**
 * 지뢰를 랜덤으로 배치해줌
 * @param boardMatrix 데이터를 따로 다룰 행렬 리스트
 */
function setRandomMine(boardMatrix) {
    let size = rowNum * colNum;
    // 빈 리스틀 만듬
    let randFill = Array(size)
        .fill(0)
        .map(function (val, idx) {
            return idx + 1;
        });
    let shuffle = [];
    while (randFill.length > size - mineNum) {
        let popVal = randFill.splice(Math.floor(Math.random() * randFill.length), 1)[0];
        shuffle.push(popVal);
    }
    console.log(shuffle);
    for (let i = 0; i < shuffle.length; i++) {

        let tRow = Math.floor(shuffle[i] / rowNum) % rowNum;
        let tCol = shuffle[i] % rowNum;
        boardMatrix[tRow][tCol] = 'x';
        table.children[tRow].children[tCol].textContent = 'x';

    }
}

/**
 *
 * @param boardMatrix 지뢰 행렬을 관리하기 위해 따로 리스트를 선언
 * html 에 table 태그를 접근하고 싶으면 table.children[인덱스].children[인덱스] 으로 접근해야됨
 */
// 지뢰 감지 함수
function checkMine(boardMatrix) {
    // 현재 내위치를 기준으로 지뢰가 있을수 있는 방향 8가지 경우의수
    let direct = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

    let mine = mineNum;
    let noMineNum = (colNum * rowNum) - mine;
    for (let i = 0; i < colNum; i++) {
        for (let j = 0; j < rowNum; j++) {
            // 지뢰개수보다 지뢰가 없는개수가 더 많을때
            // 지뢰가 있는 주변만 확인하여 계산을 줄임
            if (noMineNum > mine) {
                // 지뢰만 있는 위치를 찾고 그 주변 8부분을 탐색
                if (boardMatrix[i][j] === "x") {
                    for (let k = 0; k < 8; k++) {
                        // direct 8방향 위,아래,좌우,대각선 값을 하나하나 꺼내서 확인함
                        // 즉 내위치 주변을 확인함
                        let x = direct[k][0];
                        let y = direct[k][1];
                        // 지뢰가 내 위치를 벗어날경우
                        if ((0 <= x + i && x + i < rowNum) && (0 <= y + j && y + j < colNum)) {
                            // 내 위치를 기준으로 8방향을 돌면서 지뢰가 없는경우
                            // 즉 내 위치를 기준으로 주변에 지뢰가 없는지 확인
                            if (boardMatrix[i + x][j + y] !== "x") {
                                // 지뢰가 없는데 해당 좌표가 빈값일때
                                boardMatrix[i + x][j + y] += 1;

                            }
                        }
                        else{

                        }
                    }
                }
            }
                // 지뢰 개수가 더 많을때
            // 지뢰가 없는 부분만 확인하여 계산을 줄임
            else {
                // 지뢰가 비어있을때
                if (boardMatrix[i][j] === 0) {
                    for (let l = 0; l < 8; l++) {
                        let x = direct[l][0];
                        let y = direct[l][1];
                        // 지뢰가 내 위치를 벗어날경우
                        if ((0 <= x + i && x + i < rowNum) && (0 <= y + j && y + j < colNum)) {
                            // 내 주변에 지뢰가 있는지 확인
                            if (boardMatrix[i + x][j + y] === "x") {
                                boardMatrix[i][j] += 1;
                            }
                        }
                    }
                }
            }

        }
    }
}

// // UI 에 적용
// function notifyChanged(board) {
//     for (let i = 0; i < rowNum; i++) {
//         for (let j = 0; j < colNum; j++) {
//             if (board[i][j] !== 0) {
//                 table.children[i].children[j].textContent = board[i][j];
//             }
//
//         }
//
//     }
//
// }
function fillChecked(boardMatrix) {
    console.log("Adfs",boardMatrix)
    console.log("2,1",boardMatrix[2])
    let matrix = [];
    for (let i = 0; i < rowNum; i++) {
        let vector = [];
        for (let j = 0; j < colNum; j++) {
            console.log(boardMatrix[i][j]);
/*            if (boardMatrix[i][j]==='x' || boardMatrix[i][j]>0) {
                vector.push(false);
            } else {
                vector.push(true);
            }*/
        }
        matrix.push(vector);
    }
    return matrix;
}

// play 버튼을 눌렀을때
btn_play.addEventListener("click", function () {
    table.innerHTML = "";
    checkMatrix = [];
    gameState = true;
    rowNum = Number(row.value);
    colNum = Number(col.value);
    mineNum = Number(mine.value);
    timer.colSpan = rowNum;
    boardMatrix = setBoard();
    setRandomMine(boardMatrix);
    console.log();
    checkMatrix = fillChecked(boardMatrix);
    console.log(checkMatrix);
    console.log(boardMatrix);
    checkMine(boardMatrix);
    console.log(boardMatrix)
});
