const startBtn = document.querySelector("#start");
const currentScore = document.querySelector("#currentscore");
const highScore = document.querySelector("#highscore");
let gridElement;
let moves = [];
let count = 0;
let totalBox = 0;
let blinkTimeout;

highScore.innerHTML = localStorage.getItem("highScore") | 0;

const Grid = (ele, count) => {
    gridElement = document.querySelector(ele);
    totalBox = count;
    const grid = document.createDocumentFragment();
    for(let i = 0; i < count; i++) {
        const box = document.createElement("div");
        box.setAttribute("id", `box${i+1}`);
        box.addEventListener("mousedown", (e) => {
            compareMove(e);
        })
        box.addEventListener("mouseup", (e) => {
            completeMove(e);
        })
        grid.appendChild(box);
    }
    gridElement.appendChild(grid);
}

startBtn.addEventListener("click", () => {
    count = 1;
    blinkBox(count, "");
    startBtn.setAttribute("disabled", "true");
})

const blinkBox = (blinkCount) => {

    let randomBox = "", randomBoxNum = 0;

    if (blinkCount > 0) {
        randomBoxNum = Math.ceil(Math.random() * totalBox);
        randomBox = document.querySelector(`#box${randomBoxNum}`);
        randomBox.style.backgroundColor = "green";
        moves.push(`box${randomBoxNum}`);
    } else {
        clearTimeout(blinkTimeout);
        return;
    }

    // Blink box color
    setTimeout(() => randomBox.style.backgroundColor = "transparent", 500);

    blinkTimeout = setTimeout(blinkBox, 1000, blinkCount - 1);
}

const compareMove = (e) => {
    let clickedBox  = e.target;
    const correctMove = moves.shift();
    if (clickedBox.id === correctMove) {
        clickedBox.style.backgroundColor = "green";
    } else {
        clickedBox.style.backgroundColor = "red";
        gridElement.classList.add("error");
        currentScore.innerHTML = 0;
        moves = [];
    }
}

const completeMove = (e) => {
    let clickedBox  = e.target;

    // If it's an error, only then the moves array can be 0
    if (gridElement.classList.contains("error")) {
        setTimeout(() => {
            clickedBox.style.backgroundColor = "transparent";
            gridElement.classList.remove("error");
            startBtn.removeAttribute("disabled");
        }, 750);
    } else {
        clickedBox.style.backgroundColor = "transparent";
        if(moves.length == 0) {
            count++;
            updateScore();
            setTimeout(blinkBox, 1000, count);
        }
    }
}

const updateScore = () => {
    currentScore.innerHTML = Number(currentScore.innerHTML) + 1;
    if (Number(currentScore.innerHTML) > Number(highScore.innerHTML)) {
        highScore.innerHTML = Number(highScore.innerHTML) + 1;
    }
    localStorage.setItem("highScore", highScore.innerHTML);
}