const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0; 
let hue = 0;
let rainbow = false; 
let colorPicker = document.querySelector('#color');
let button = document.querySelector('.button');

function drawLine(e){
    if(!isDrawing) return;

    if(!rainbow){
        ctx.strokeStyle = colorPicker.value;
        console.log(colorPicker)
    } else {
        ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    }

    ctx.beginPath();
    // starts from
    ctx.moveTo(lastX, lastY);
    // goes to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    if(rainbow){
        hue++
    }
};

function changeColor(){
    rainbow = false; 
    ctx.strokeStyle = colorPicker.value;
    button.style.setProperty("background-color", "lightslategray")
}

function changeRainbow(){
    if(rainbow){
        rainbow = false;
        button.style.setProperty("background-color", "lightslategray")
    } else {
        rainbow = true;
        button.style.setProperty("background-color", "lightgreen")
    }
    console.log(rainbow);
}

canvas.addEventListener('mousemove', drawLine);
canvas.addEventListener('mousedown', (e)=>{
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', ()=>isDrawing = false);
canvas.addEventListener('mouseout', ()=> isDrawing = false);
button.addEventListener('click', changeRainbow); 
colorPicker.addEventListener('change',changeColor)