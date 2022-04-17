// Defining temporary color
let selectedColor = null;

/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */
function PixelArt(el, rows, cols) {
    const element = document.querySelector(el);
    // Create Grid
    const grid = document.createDocumentFragment();
    for(let i=0; i<rows; i++) {
        const row = document.createElement("div");
        grid.appendChild(row);
        for(let j=0; j<cols; j++) {
            const col = document.createElement("div");
            col.classList.add("droptarget");

            // Add cell color/drag handler
            if(i != rows-1) {
                col.setAttribute("draggable", "true")
                col.addEventListener("dragstart", (e) => {
                    let img = new Image();
                    e.dataTransfer.setDragImage(img, 0, 0);
                })
                col.addEventListener("dragenter", (e) => {
                    if (e.target.classList.contains("droptarget"))
                        col.style.backgroundColor = "black";
                })
                col.addEventListener("click", () => {
                    col.style.backgroundColor = selectedColor;
                })
            }
            row.appendChild(col);
        }
    }

    element.appendChild(grid);

    // Add colors in last row
    const lastRow = element.lastChild
    for(let i=0; i<cols; i++) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        const cell = lastRow.childNodes[i];
        cell.style.backgroundColor = `#${randomColor}`;
        cell.addEventListener("click", (e) => {
            selectedColor = e.target.style.backgroundColor;
        });
    }
}