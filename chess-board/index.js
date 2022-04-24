
// Create Chess Board

const board = document.querySelector("#board");
const grid = document.createDocumentFragment();
for(let i=0; i<8; i++){
    const r = document.createElement("div");
    for(let j=0; j<8; j++) {
        const c = document.createElement("div");
        if((i+j) % 2 == 0) {
            c.style.backgroundColor = "white";
        } else {
            c.style.backgroundColor = "black";
        }
        c.setAttribute("data-row", i);
        c.setAttribute("data-col", j);
        c.addEventListener("click", colorDiagonals);
        r.appendChild(c);
    }
    grid.appendChild(r);
}
board.appendChild(grid);

function resetBoard() {
    for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
            if((i+j) % 2 == 0) {
                board.childNodes[i].childNodes[j].style.backgroundColor = "white";
            } else {
                board.childNodes[i].childNodes[j].style.backgroundColor = "black";
            }
        }
    }   
}

function colorDiagonals(e) {
    resetBoard();
    const rownum = e.target.getAttribute("data-row");
    const colnum = e.target.getAttribute("data-col");

    // Color upper-left diagonal
    for(let i=rownum, j=colnum; i>=0 & j>=0; i--, j--) {
        board.childNodes[i].childNodes[j].style.backgroundColor = "red";
    }

    // Color upper-right diagonal
    for(let i=rownum, j=colnum; i>=0 & j<8; i--, j++) {
        board.childNodes[i].childNodes[j].style.backgroundColor = "red";
    }

    // Color bottom-left diagonal
    for(let i=rownum, j=colnum; i<8 & j>=0; i++, j--) {
        board.childNodes[i].childNodes[j].style.backgroundColor = "red";
    }

    // Color upper-right diagonal
    for(let i=rownum, j=colnum; i<8 & j<8; i++, j++) {
        board.childNodes[i].childNodes[j].style.backgroundColor = "red";
    }
}