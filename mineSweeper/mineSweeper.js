let divRowTag = document.querySelector("#board-row");
let divColTag = document.querySelector("#board-col");
let divMineTag = document.querySelector("#board-mine");
let btnPlayTag = document.querySelector("#board-play");
let tableTag = document.querySelector("#board-table > #board-table-body");
let result = document.querySelector("#result");

let boardMatrix = [];
let boardCheck = [];
let checkList = [];

let nCol;
let nRow;
let nMine;
let chekNum;
let gameCount = 0;
let noMine;

let tag = {
    flag: '!',
    question: '?',
    mine: 'x',
    no_mine: 0,
    open: 'o',
    boardCheck_road: 0,
    boardCheck_mine: 1,
    boardCheck_number: 2,
    boardCheck_flag: 3,
    boardCheck_not: 4
}

function drawTableTag() {
    for (let i = 0; i < nRow; i++) {
        let tr = document.createElement("tr");
        tr.id = "board-row-" + (i + 1);
        tableTag.append(tr);
        for (let j = 0; j < nCol; j++) {
            let td = document.createElement("td");
            td.id = "board-col-" + (j + 1);
            tr.append(td);

        }
    }
}

function setBoardMatrix() {
    for (let i = 0; i < nRow; i++) {
        let Vector = [];
        for (let j = 0; j < nCol; j++) {
            Vector.push(0);
        }
        boardMatrix.push(Vector);
    }
    setRandMine(nRow, nCol, nMine);
}

function setRandMine(nRow, nCol, nMine) {
    let size = nRow * nCol;
    let flattenMat = Array(size)
        .fill(0)
        .map(function (val, idx) {
            return idx + 1;
        })
    let randVector = [];
    while (flattenMat.length !== 0) {
        let popVal = flattenMat.splice(Math.floor(Math.random() * flattenMat.length), 1);
        randVector.push(popVal);
    }
    let mineVector = randVector.slice(0, nMine + 1);
    noMine = mineVector.pop();
    for (let val of mineVector) {
        val -= 1;
        let x = Math.floor(val / nRow) % nRow;
        let y = val % nRow;
        boardMatrix[x][y] = "x";
    }
    aroundMine(nRow, nCol, nMine);
}

function checkMine(i, j, nRow, nCol) {
    let direct = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let k = 0; k < direct.length; k++) {
        let x = i + direct[k][0];
        let y = j + direct[k][1];
        if ((0 <= x && x < nRow) && (0 <= y && y < nCol)) {
            if (boardMatrix[i + direct[k][0]][j + direct[k][1]] !== "x") {
                boardMatrix[i + direct[k][0]][j + direct[k][1]] += 1;
            }
        }
    }
}

function aroundMine(nRow, nCol, nMine) {
    let size = nRow * nCol;
    let noMine = size - nMine;
    let cnt = 0;
    if (nMine < noMine) {
        for (let i = 0; i < nRow; i++) {
            for (let j = 0; j < nCol; j++) {
                if (boardMatrix[i][j] === "x") {
                    checkMine(i, j, nRow, nCol);
                    cnt += 1;
                }
            }
        }
    }
}

function setBoardCheck() {
    for (let i = 0; i < nRow; i++) {
        let Vector = [];
        let checkVec = [];
        for (let j = 0; j < nCol; j++) {
            if (boardMatrix[i][j] === 0) {
                checkVec.push(false);
                Vector.push(tag.boardCheck_road);
            } else if (boardMatrix[i][j] === tag.mine) {
                checkVec.push(true);
                Vector.push(tag.boardCheck_mine);
            } else {
                checkVec.push(false);
                Vector.push(tag.boardCheck_number);
            }
        }
        checkList.push(checkVec);
        boardCheck.push(Vector);
    }
}

function updateUI() {
    for (let i = 0; i < nRow; i++) {
        for (let j = 0; j < nCol; j++) {
            if (boardMatrix[i][j] !== 0) {
                tableTag.children[i].children[j].textContent = "";
            }
        }
    }
}

function getCountMine(r, c) {
    let size = nRow * nCol;
    let direct = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    let noMine = size - nMine;
    let cnt = 0;
    for (let i = 0; i < direct.length; i++) {
        let x = r + direct[i][0];
        let y = c + direct[i][1];
        if ((0 <= x && x < nRow) && (0 <= y && y < nCol)) {
            if (boardMatrix[x][y] === "x") {
                cnt += 1;
            }
        }
    }
    return cnt;
}

function canGo(i, j) {
    let flag = 0
    if (i >= 0 && i < nRow && j >= 0 && j < nCol) {
        flag = 1;
    }
    return flag !== 0;
}

function openBoard(i, j) {
    let currentTag = tableTag.children[i].children[j].textContent;
    if (boardCheck[i][j] === tag.open || boardMatrix[i][j] === tag.mine || boardCheck[i][j] === tag.boardCheck_flag || boardCheck[i][j] === tag.boardCheck_not) {
        return;
    }
    boardCheck[i][j] = tag.open;
    chekNum += 1;
    if (getCountMine(i, j) === 0) {
        if (canGo(i - 1, j)) {
            openBoard(i - 1, j);
        }
        if (canGo(i - 1, j - 1)) {
            openBoard(i - 1, j - 1);
        }
        if (canGo(i - 1, j + 1)) {
            openBoard(i - 1, j + 1);
        }
        if (canGo(i + 1, j + 1)) {
            openBoard(i + 1, j + 1);
        }
        if (canGo(i + 1, j - 1)) {
            openBoard(i + 1, j - 1);
        }
        if (canGo(i + 1, j)) {
            openBoard(i + 1, j);
        }
        if (canGo(i, j + 1)) {
            openBoard(i, j + 1);
        }
        if (canGo(i, j - 1)) {
            openBoard(i, j - 1);
        }
    }
}

function setUIOpenTag() {
    for (let i = 0; i < nRow; i++) {
        for (let j = 0; j < nCol; j++) {
            if (boardCheck[i][j] === tag.open) {
                switch (boardMatrix[i][j]) {
                    case 0:
                        tableTag.children[i].children[j].classList.add("open");
                        break;
                    case 1:
                        tableTag.children[i].children[j].classList.add("num1");
                        break;
                    case 2:
                        tableTag.children[i].children[j].classList.add("num2");
                        break;
                    case 3:
                        tableTag.children[i].children[j].classList.add("num3");
                        break;
                    case 4:
                        tableTag.children[i].children[j].classList.add("num4");
                        break;
                    case 5:
                        tableTag.children[i].children[j].classList.add("num5");
                        break;
                    case 6:
                        tableTag.children[i].children[j].classList.add("num6");
                        break;
                    case 7:
                        tableTag.children[i].children[j].classList.add("num7");
                        break;
                    case 8:
                        tableTag.children[i].children[j].classList.add("num8");
                        break;
                    case 9:
                        tableTag.children[i].children[j].classList.add("num9");
                        break;


                }
            }
        }
    }
}

function countOpenBlock() {
    let count = 0;
    for (let i = 0; i < nRow; i++) {
        for (let j = 0; j < nCol; j++) {
            if (boardCheck[i][j] === "o") {
                count += 1;
            }
        }
    }
    return count;
}

function setOnItemClickListener() {
    for (let i = 0; i < nRow; i++) {
        for (let j = 0; j < nCol; j++) {
            let currentItem = tableTag.children[i].children[j];
            currentItem
                .addEventListener("click", (event) => {
                    console.log(boardCheck);
                    if (boardMatrix[i][j] === "x") {
                        if(gameCount===0){
                            let x = Math.floor(noMine / nRow) % nRow;
                            let y = noMine % nRow;
                            console.log(x,y);
                            boardMatrix[x][y] ="x";
                            let count = getCountMine(i,j);
                            boardMatrix[i][j] = count;
                            boardCheck = count===0?tag.boardCheck_road:tag.boardCheck_number;
                            console.log(boardMatrix)

                        }
                        else{
                            result.textContent = "실패ㅠㅠ";
                            return;
                        }
                    }

                    openBoard(i, j, nRow, nCol, currentItem, nMine);
                    setUIOpenTag();
                    if (countOpenBlock() === nRow * nCol - nMine) {
                        result.textContent = "성공 bb";
                        return true;
                    }

                })
            currentItem
                .addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    if (boardCheck[i][j] === tag.boardCheck_flag) {
                        currentItem.classList.remove("mine");
                        currentItem.classList.add("question");
                        boardCheck[i][j] = tag.boardCheck_not;
                    } else if (boardCheck[i][j] === tag.boardCheck_not) {
                        currentItem.classList.remove("question");
                        boardCheck[i][j] = tag.boardCheck_road

                        switch (boardMatrix[i][j]) {
                            case 0:
                                tableTag.children[i].children[j].classList.add("open");
                                break;
                            case 1:
                                tableTag.children[i].children[j].classList.add("num1");
                                break;
                            case 2:
                                tableTag.children[i].children[j].classList.add("num2");
                                break;
                            case 3:
                                tableTag.children[i].children[j].classList.add("num3");
                                break;
                            case 4:
                                tableTag.children[i].children[j].classList.add("num4");
                                break;
                            case 5:
                                tableTag.children[i].children[j].classList.add("num5");
                                break;
                            case 6:
                                tableTag.children[i].children[j].classList.add("num6");
                                break;
                            case 7:
                                tableTag.children[i].children[j].classList.add("num7");
                                break;
                            case 8:
                                tableTag.children[i].children[j].classList.add("num8");
                                break;
                            case 9:
                                tableTag.children[i].children[j].classList.add("num9");
                                break;


                        }
                    } else {
                        currentItem.classList.add("mine");
                        boardCheck[i][j] = tag.boardCheck_flag;
                    }

                })

        }

    }
}

btnPlayTag.addEventListener("click", function () {
    tableTag.innerHTML = "";
    result.textContent = "";

    chekNum = 0;
    gameCount = 0;
    nCol = Number(divColTag.value);
    nRow = Number(divRowTag.value);
    nMine = Number(divMineTag.value);
    if (nMine === 1 || (nCol === 1 && nRow === 1)) {
        alert("아니 이건 개쉽잖아");
    } else {
        boardMatrix = [];
        boardCheck = [];
        checkList = [];
        drawTableTag();
        setBoardMatrix();
        setBoardCheck();
        updateUI();
        console.log(boardMatrix);
        setOnItemClickListener();
    }
});

