const canvas = document.querySelector("#canvas"); // put the square divs inside the canvas
const slider = document.querySelector("#gridWidth");
const color = document.querySelector("#color");
const widthValues = document.querySelectorAll(".grid-width-value");
const colorButton = document.querySelector(".color-mode");
const psychedelicButton = document.querySelector(".rgb");
const eraser = document.querySelector(".eraser");
const clear = document.querySelector(".clear");
let grids = []; // will store the reference to grids
let brushColor = '#000000'; // default black rakhne
let isMouseDown = false; // track state of 
let rgbMode = false; // track for psychedelic 

const CANVAS_WIDTH = canvas.clientWidth || 560;
const CANVAS_HEIGHT = canvas.clientHeight || 360;

let gridSize = 16;

// clear active-btn class for each buttons
function clearActiveButton() {
    colorButton.classList.remove('active-btn');
    psychedelicButton.classList.remove('active-btn');
    eraser.classList.remove('active-btn');
}

// random hex generator
const randomHex = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// generate divs inside the canvas
function generateDiv() {
    // clear the existing grid to avoid appending to old grids
    canvas.innerHTML = '';
    // clear grid array
    grids = [];

    // generate grid rows and columns
    for (let i = 0; i < gridSize; i++) {
        let gridRow = document.createElement('div');
        gridRow.setAttribute('style', 'display: flex;')

        for (let j = 0; j < gridSize; j ++) {
            let grid = document.createElement('div');

            grid.style.width = `${CANVAS_WIDTH/gridSize}px`;
            grid.style.height = `${CANVAS_HEIGHT/gridSize}px`;
            // add a class to identify grid cells
            grid.classList.add('grid-cell');
            gridRow.appendChild(grid);
            grids.push(grid);
        }
        canvas.appendChild(gridRow);
    }
}

// handle grid coloring using eventHandler on canvas as a whole
canvas.addEventListener('mousedown', (event) => {
    // avoid the default drag behaviour when mouse is moved fast
    event.preventDefault();
    
    // ensure target is grid cell
    if (event.target.classList.contains('grid-cell')) {
        isMouseDown = true;
        colorGrid(event.target);
    }
});
canvas.addEventListener('mouseover', (event) => {
    if (isMouseDown && event.target.classList.contains('grid-cell')) {
        colorGrid(event.target);
    }
});
// get the div a color, only when mouse button is down
document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// set background color of the clicked grid
function colorGrid(grid) {
    if (!rgbMode) {
        grid.style.backgroundColor = brushColor;
    } else {
        grid.style.backgroundColor = randomHex();
    }
}

// generate new div upon changing value through slider
slider.addEventListener('input', () => {
    gridSize = slider.value;
    widthValues.forEach((widthValue) => {
        widthValue.innerText = gridSize;
    });

    // generate new grid
    generateDiv();
})

// update brush color
color.addEventListener('input', () => {
    brushColor = color.value;
});

// activate color mode
colorButton.addEventListener('click', () => {
    clearActiveButton();
    colorButton.classList.add('active-btn');
    brushColor = color.value;
    rgbMode = false;
});

// activate psychedelic mode
psychedelicButton.addEventListener('click', () => {
    clearActiveButton();
    psychedelicButton.classList.add('active-btn');
    rgbMode = true;
});

// activate eraser mode
eraser.addEventListener('click', () => {
    clearActiveButton();
    eraser.classList.add('active-btn');
    brushColor = 'silver';
    rgbMode = false;
});

// clear grids
clear.addEventListener('click', () => {
    grids.forEach((grid) => {
        grid.style.backgroundColor = 'silver';
    });
});

// initial 16*16 grid
generateDiv();