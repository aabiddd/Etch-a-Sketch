const CANVAS_WIDTH = 560;
const CANVAS_HEIGHT = 360;

const gridSize = 16;

const canvas = document.querySelector("#canvas"); // put the square divs inside the canvas
let grids = []; // will store the reference to grids
let isMouseDown = false; // track state of mouse

// generate div
for (let i = 0; i < gridSize; i++) {
    let gridRow = document.createElement('div');
    gridRow.setAttribute('style', 'display: flex;')
    for (let j = 0; j < gridSize; j ++) {
        let grid = document.createElement('div');
        grid.setAttribute('style', `width: ${CANVAS_WIDTH/gridSize}px; height: ${CANVAS_HEIGHT/gridSize}px;`);
        gridRow.appendChild(grid);
        grids.push(grid); // to perform operations outside of loop
    }
    canvas.appendChild(gridRow);
}

grids.forEach((grid) => {
    grid.addEventListener('mousedown', () => {
        event.preventDefault(); // avoid the default drag behaviour when mouse is moved fast
        isMouseDown = true; // mouse is being pressed down
        grid.style.backgroundColor = "black";
    });

    grid.addEventListener('mouseover', () => {
        if (isMouseDown) {
            grid.style.backgroundColor = "black";
        }
    });

});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});