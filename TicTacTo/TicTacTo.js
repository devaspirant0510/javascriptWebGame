const table_body = document.querySelector("#table>.table-body");
const play_btn = document.querySelector("#play-btn");
const result = document.querySelector("#result");

let tag = {
    type_o: 'o',
    type_x: 'x',
    game_state_draw: -1
};

/**
 * 테이블 태그 그림, matrix 에 현재 값을 행렬형태로 저장
 * @param matrix
 */
function setTable(matrix) {
    for (let row = 0; row < 3; row++) {
        // row 값 html 태그에 추가
        let tr = document.createElement("tr");
        let vector = [];
        for (let col = 0; col < 3; col++) {
            let td = document.createElement("td");
            // row 에 td 태그 하나씩 추가
            tr.appendChild(td)
            // 행렬에는 초기값으로 0 추가
            vector.push(0);
        }
        // 최종정으로 바디태그에 추가한 row 값을 넣음
        table_body.appendChild(tr);
        matrix.push(vector);
    }
}

function setOnItemClickListener(matrix) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let currentItem = table_body.children[i].children[j];
            currentItem.addEventListener("click", () => {
                if(checkGameState(matrix)%2===1){
                    return;
                }
                if (matrix[i][j] === 0) {
                    console.log(matrix);
                    matrix[i][j] = "o"
                    notifySetOnUI(matrix);
                    if (isWin(matrix) === "o") {
                        result.textContent = "축하합니다. O 님이 이겼습니다.";
                        setTimeout(() => {
                            result.textContent = "";
                            const initMat = [];
                            table_body.innerHTML = "";
                            setTable(initMat);
                            result.textContent = "다시 시작할려면 play 버튼을 누르세요"


                        }, 1400);
                        return;
                    }
                    if (checkGameState(matrix) < 8) {
                        setTimeout(() => {
                            computerTurn(matrix);
                        }, 1000);
                    } else {
                        result.textContent = "아쉽네요 무승부에요ㅠㅠㅠㅠㅠㅠㅠㅠ";
                    }
                }
            });
        }
    }
}

function computerTurn(board) {
    console.log("com", board);
    // 컴퓨터는 랜덤값으로 지정
    let randX = Math.floor(Math.random() * 3);
    let randY = Math.floor(Math.random() * 3);
    console.log("pos", randX, randY)
    // 랜덤으로 선택한 값이 이미 선택된 값이라면 다시 랜덤으로 생성
    if (board[randY][randX] !== 0) {
        computerTurn(board)
    } else {
        board[randY][randX] = "x";
        if (isWin(board) === "x") {
            result.textContent = "축하합니다. x 님이 이겼습니다.";
            setTimeout(() => {
                result.textContent = "";
                const initMat = [];
                table_body.innerHTML = "";
                setTable(initMat);
                result.textContent = "다시 시작할려면 play 버튼을 누르세요"

            }, 1400);
        }
        notifySetOnUI(board);
    }
}

/**
 * 행렬값을 넘겨 UI html 에 업데이트
 * @param board
 */
function notifySetOnUI(board) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] !== 0) {
                let curItem = table_body.children[i].children[j];
                if (board[i][j] === tag.type_o) {
                    curItem.textContent = board[i][j];
                    curItem.classList.add("type-o");
                } else {
                    curItem.textContent = board[i][j];
                    curItem.classList.add("type-x");
                }
            }
        }
    }
    checkGameState(board);
}

function checkGameState(board) {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] !== 0) {
                count += 1;
            }
        }

    }
    if (count === 9) {
        return count;
    }
    return count;
}

/**
 * 승리 판단
 * @param board
 * @returns {*} 누가 이겼는지 리턴
 */
function isWin(board) {
    // 상대와 내가 최소한 5개는 놔야 승리판단을 할수 있음
    // 각각 최소한 3개이상은 가지고 있어야 되기 떄문
    if (checkGameState(board) > 4) {
        if (board[0][0] !== 0 &&
            board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }
        if (board[0][2] !== 0 &&
            board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[1][1];
        }
        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== 0 &&
                board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i];
            }
            if (board[i][0] !== 0 &&
                board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            }
        }

    }
    return null;
}

function checkTurn(turn) {
    if (turn === tag.type_o) {
        return tag.type_x;
    } else {
        return tag.type_o;
    }
}

// 시작버튼을 눌렀을때
play_btn.addEventListener("click", (event) => {
    // 테이블 초기화
    table_body.innerHTML = ""
    // 결과값 초기화
    result.textContent = ""
    // 첫번째 턴은 O
    let turn = tag.type_o;
    // 틱택토 보드판상태를 알려줄 행렬 초기화
    let matrix = [];
    setTable(matrix);
    console.log(matrix);
    setOnItemClickListener(matrix);
});
