

function Grid(ele, row, col) {

    const grid = document.querySelector(ele);
    grid.innerHTML = "";
    const colors = getRandomColors();
    const randomRow = Math.floor(Math.random() * row);
    const randomCol = Math.floor(Math.random() * col);
    const frag = document.createDocumentFragment();

    for(let i=0;i<row;i++) {
        const r = document.createElement('div');
        for(let j=0;j<col;j++) {
            const c = document.createElement('div');
            if(i === randomRow && j === randomCol) {
                c.style.backgroundColor = colors.oddColor;
            } else {
                c.style.backgroundColor = colors.color;
            }

            c.addEventListener("click", (e) => {
                if(e.target.style.backgroundColor === colors.oddColor) {
                    let score = document.getElementById("score");
                    score.innerHTML = parseInt(score.innerHTML) + 1;
                    Grid(ele, row+1, col+1);
                } else {
                    grid.classList.add('shake');
                    setTimeout(() => {
                        grid.classList.remove('shake');
                    }, 800);
                    let score = document.getElementById("score");
                    score.innerHTML = 0;
                    Grid(ele, 4, 4);
                }
            });
            r.appendChild(c);
        }
        frag.appendChild(r);
    }
    grid.appendChild(frag);
}


const getRandomColors = function(){

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    const color = `rgba(${r}, ${g}, ${b}, 1)`;
    const oddColor = `rgba(${r}, ${g}, ${b}, 0.85)`;

    return {
        color,
        oddColor
    }
}