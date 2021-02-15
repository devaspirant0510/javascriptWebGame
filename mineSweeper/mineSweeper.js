let divRowTag = document.querySelector("#board-row");
let divColTag = document.querySelector("#board-col");
let divMineTag = document.querySelector("#board-mine");
let btnPlayTag = document.querySelector("#board-play");
let tableTag = document.querySelector("#board-table > #board-table-body");

let boardMatrix = [];
let boardCheck = [];
let checkList = [];

let nCol;
let nRow;
let nMine;

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
    let tempMine = mineVector.pop();
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
                Vector.push(0);
            } else if (boardMatrix[i][j] === 'x') {
                checkVec.push(true);
                Vector.push(1);
            } else {
                checkVec.push(false);
                Vector.push(2);
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
                tableTag.children[i].children[j].textContent = boardMatrix[i][j];
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
    console.log(i,j);
    let flag = 0
    if (i >= 0 && i <nRow && j >= 0 && j < nCol) {
        flag = 1;

    }
    console.log("flag",flag);
    return flag !== 0;
}

function openBoard(i, j) {
    if (boardCheck[i][j] === 'o' || boardMatrix[i][j] === 'x') {
        return;
    }
    boardCheck[i][j] = 'o';
    if (getCountMine(i, j) === 0) {

        console.log(boardCheck);
        if (canGo(i - 1, j)) {

            openBoard(i - 1, j);
        }
        if(canGo(i-1,j-1)){

            openBoard(i - 1, j-1);
        }
        if(canGo(i-1,j+1)){

            openBoard(i - 1, j+1);
        }
        if(canGo(i+1,j)){

            openBoard(i + 1, j);
        }
        if(canGo(i+1,j-1)){

            openBoard(i + 1, j-1);
        }
        if(canGo(i+1,j)){

            openBoard(i + 1, j);
        }
        if(canGo(i,j+1)){

            openBoard(i, j+1);
        }
        if(canGo(i,j-1)){

            openBoard(i, j-1);
        }
        /*
                    openBoard(i-1,j+1);
                    openBoard(i-1,j-1);

                    openBoard(i+1,j);
                    openBoard(i+1,j+1);
                    openBoard(i+1,j-1);
        */


        // openBoard(i-1,j-1);
        // openBoard(i+1,j);
        // openBoard(i+1,j-1);
        // openBoard(i+1,j+1);
        // openBoard(i,j+1);
        // openBoard(i,j-1);

    }
}

function setUIOpenTag() {
    for (let i = 0; i < nRow; i++) {
        for (let j = 0; j < nCol; j++) {
            if (boardCheck[i][j] === 'o') {

                tableTag.children[i].children[j].classList.add("open");
            }

        }

    }
}

function setOnItemClickListener() {
    for (let i = 0; i < nRow; i++) {
        for (let j = 0; j < nCol; j++) {
            let currentItem = tableTag.children[i].children[j];
            currentItem
                .addEventListener("click", () => {
                    if (currentItem.textContent === "?" || currentItem.textContent === "!") {
                        if (boardMatrix[i][j] === 0) {
                            currentItem.textContent = "";
                        } else {
                            currentItem.textContent = boardMatrix[i][j];
                        }
                    }
                    openBoard(i, j, nRow, nCol, currentItem, nMine);
                    setUIOpenTag();

                })
            currentItem
                .addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    if (currentItem.textContent === "!") {
                        currentItem.textContent = "?";
                    } else if (currentItem.textContent === "?") {
                        if (boardMatrix[i][j] === 0) {
                            currentItem.textContent = "";
                        } else {
                            currentItem.textContent = boardMatrix[i][j];
                        }
                    } else {
                        currentItem.textContent = "!";
                    }

                })

        }

    }
}

btnPlayTag.addEventListener("click", function () {
    tableTag.innerHTML = "";
    nCol = Number(divColTag.value);
    nRow = Number(divRowTag.value);
    nMine = Number(divMineTag.value);
    boardMatrix = [];
    boardCheck = [];
    checkList = [];
    drawTableTag();
    setBoardMatrix();
    setBoardCheck();
    updateUI();
    setOnItemClickListener();


})

