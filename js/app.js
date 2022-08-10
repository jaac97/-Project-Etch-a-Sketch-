let drap;
let modo = 'color';

function showGrid(size = 16) {
    const grid = document.querySelector('.grid');
    grid.style = `
                grid-template-columns: repeat(${size}, 1fr);
                grid-template-rows: repeat(${size}, 1fr);
    `;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('mousedown', setColor);
        square.addEventListener('mouseover', setColor);

        grid.appendChild(square)
    }

}

function setColor(e) {
    if (e.type == 'mouseover' && !drap) return false;
    let color;
    if (modo == "rainbow") {
        const red = Math.floor(Math.random() * 256)
        const green = Math.floor(Math.random() * 256)
        const blue = Math.floor(Math.random() * 256)
        color = `rgb(${red},${green}, ${blue})`;
    } else if (modo == 'color'){
        const colorPicker = document.querySelector('#colorPicker');
        color = colorPicker.value; 
    } else if(modo == 'eraser') {
        color = "#F3FDF4"
    }
    e.target.style.backgroundColor = color;


}

function setModo(e) {
    if(e.target.id !== 'clear') {
        modo = e.target.id
         const btns = document.querySelectorAll('button[id]');
         btns.forEach(btn => {
            btn.classList.remove('active')
         })
         e.target.classList.add('active')
        
    }else{
        const squares = document.querySelectorAll('.square');
       squares.forEach(square => square.style.backgroundColor = "#F3FDF4")
    }


}

function getGridSize() {
    const size = prompt("Write your grid size (max: 100)") || 16;
    console.log(size)
}

function eventListener() {
    const grid = document.querySelector('.grid');
    grid.addEventListener('mousedown', () => drap = true)
    grid.addEventListener('mouseup', () => drap = false)

    const popUp = document.querySelector('#popUp');
    popUp.addEventListener('click', getGridSize)
    showGrid();

    const btns = document.querySelectorAll('button[id]');
    btns.forEach(btn => btn.addEventListener('click', setModo))

}
eventListener()