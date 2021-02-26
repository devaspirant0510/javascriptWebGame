const table = document.querySelector("#table>.table-body");
const play_btn = document.querySelector("#play-btn");
const result = document.querySelector("#result");
let table_row = [];
let table_tag = [];
let state = true;

let tag = {
    type_o: 'o',
    type_x: 'x',
    game_state_draw: -1
};

function setTable(matrix) {
    for (let row = 0; row < 3; row++) {
        let tr = document.createElement("tr");
        table_row.push(tr);
        let vector = [];
        for (let col = 0; col < 3; col++) {
            let td = document.createElement("td");
            tr.appendChild(td)
            vector.push(0);
        }
        table.appendChild(tr);
        table_tag.push(table_row);
        matrix.push(vector);
    }
}

function setOnItemClickListener(turn, matrix) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let currentItem = table.children[i].children[j];
            currentItem.addEventListener("click", () => {
                if(matrix[i][j]===0){
                    console.log(matrix);
                    matrix[i][j] = turn
                    turn = checkTurn(turn);
                    notifySetOnUI(matrix);
                }
            });
        }
    }
    console.log(turn)
}

function notifySetOnUI(board) {

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] !== 0) {
                let curItem = table.children[i].children[j];
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
        result.textContent = "s";
        state = false;
    }
}

function checkTurn(turn) {
    if (turn === tag.type_o) {
        return tag.type_x;
    } else {
        return tag.type_o;
    }
}

play_btn.addEventListener("click", (event) => {
    let turn = tag.type_o;
    let matrix = [];
    table_tag = [];
    state = true;
    setTable(matrix);
    console.log(matrix);
    setOnItemClickListener(turn, matrix);
});
