let divRowTag = document.querySelector("#board-row");
let divColTag = document.querySelector("#board-col");
let divMineTag = document.querySelector("#board-mine");
let btnPlayTag = document.querySelector("#board-play");
let tableTag = document.querySelector("#board-table > #board-table-body");

let boardMatrix = [];
let boardCheck = [];

function drawTableTag(nRow, nCol) {
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

function setBoardMatrix(nRow, nCol, nMine) {
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
            return idx+1;
        })
    let randVector = [];
    console.log(flattenMat);
    while (flattenMat.length !== 0) {
        let popVal = flattenMat.splice(Math.floor(Math.random() * flattenMat.length), 1);
        randVector.push(popVal);
    }
    let mineVector = randVector.slice(0, nMine+1);

    for (const val of mineVector){
        let x = Math.floor(val/nRow)%nRow;
        let y = val%nRow;
        console.log(x,y)
        boardMatrix[x][y] = "x";
    }
    console.log(mineVector);
}

function setBoardCheck() {

}

btnPlayTag.addEventListener("click", function () {
    tableTag.innerHTML = "";
    let numCol = Number(divColTag.value);
    let numRow = Number(divRowTag.value);
    let numMine = Number(divMineTag.value);
    boardMatrix = [];
    boardCheck = [];
    drawTableTag(numRow, numCol);
    setBoardMatrix(numRow, numCol, numMine);
    console.log(boardMatrix);


})

