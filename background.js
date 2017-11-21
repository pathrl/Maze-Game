/**
 * Declaracion de condiciones de inicio
 */
const myCanvas = document.getElementById('snakeGame');
const ctx = myCanvas.getContext('2d');
ctx.canvas.width = 1020;
ctx.canvas.height = 512;
ctx.font = "13px arial";

const background = new Image();

initialize();

/**
 * @method init  initialize function
 */
function initialize() {
  background.onload = function() {
    ctx.drawImage(background, 6, 6, 500, 500);
  }
  background.src = './img/maze2.png';
  
}
