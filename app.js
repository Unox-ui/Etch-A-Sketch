const gridContainer = document.querySelector('#grid-container');
const resetBtn = document.querySelector('#reset');
const slider = document.querySelector('#slider');
const colorBtns = document.querySelectorAll('.colorBtn');
const defaultGridSize = 16;
let color = 'random';

function makegrid(size){
    gridContainer.style.setProperty('--grid-size', size);
    for (c = 0; c < (size * size); c++) {
      let gridElement = document.createElement("div");
      gridContainer.appendChild(gridElement).className = "grid-element";
      gridElement.addEventListener('mouseover', colorize);
    };
};

function changeSize(){
    const slider = document.querySelector('#slider');
    gridContainer.innerHTML = '';
    makegrid(slider.value);
}

function colorize(e){
    if (color === 'black') {
        var finalcolor = '#121212';
    }
    else if (color === 'rainbow'){
        var finalcolor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
    else if (color === 'gray'){  
        if (this.style.backgroundColor.match(/rgba/)){
            // get opacity from rgba color format :
            let opacity = Number(this.style.backgroundColor.replace(/^.*,(.+)\)/,'$1')); 
            if (opacity < 1) {
                console.log('opacity < 1');
                var finalcolor = `rgba(0, 0, 0, ${opacity + 0.1})`;
            }
        }
        else if (this.style.backgroundColor === 'rgb(0, 0, 0)'){
            return;
        }
        else var finalcolor = `rgba(0, 0, 0, 0.1)`;
    }
    else{
        let colorR = Math.floor(Math.random() * 256);
        let colorG = Math.floor(Math.random() * 256);
        let colorB = Math.floor(Math.random() * 256);
        var finalcolor = `rgb(${colorR},${colorG},${colorB})`;
    }
    e.target.style.background = finalcolor;
}

function resetGrid(){
    //remove all children of gridContainer:
    gridContainer.innerHTML = '';
    makegrid(defaultGridSize);
}

function setColor(){
    color = this.id;
}

slider.addEventListener('mouseup', changeSize);
resetBtn.addEventListener('click', resetGrid);
colorBtns.forEach(colorBtn => colorBtn.addEventListener('click', setColor));

//Grid Initialization
makegrid(defaultGridSize);