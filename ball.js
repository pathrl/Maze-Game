/**
 * Canvas
 */
const canvasBall = document.getElementById('ball');
let contextBall = canvasBall.getContext('2d');
contextBall.canvas.width = 512;
contextBall.canvas.height = 512;

/**
 * Init dats
 */
let temp;
let ballObject = {
  posX: 0,
  posY: 165,
  velocity: 10,
  direction: Math.PI * 2, // 0 grados DE FRENTE
};

initialize();

/**
 * @method initialize init methdo
 */

function initialize() {
  ballObject.img = new Image();
  ballObject.height = 30;
  ballObject.width = 30;
  ballObject.rangeX = ballObject.width / 2;
  ballObject.rangeY = ballObject.height / 2;

  ballObject.img.onload = function() {
    contextBall.drawImage(ballObject.img, ballObject.posX, ballObject.posY, ballObject.height, ballObject.width);
  }
  ballObject.img.src = './img/ball.png';

  temp = setTimeout('update()', 16);
  update();
}

/**
 * @method update loop method
 */

function update() {

  contextBall.clearRect(0, 0, contextBall.canvas.width, contextBall.canvas.height);

  document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    charStr = String.fromCharCode(charCode);
    console.log(charStr);
    switch (charStr) {
      case '': //Aumento velocidad
        break;
      case 'a': // Izquierda
        ballObject.direction = Math.PI;
        break;
      case 's': // Abajo
        ballObject.direction = Math.PI / 2;
        break;
      case 'd': // Derecha
        ballObject.direction = Math.PI * 2;
        break;
      case 'w': // Arriba
        ballObject.direction = (3 * Math.PI) / 2;
        break;
      default: break;
    }

  //Recogo los colores que existen en el punto al que se dirige el objecto
  let auxX = ballObject.posX + Math.cos(ballObject.direction) * ballObject.velocity;
  let auxY = ballObject.posY + Math.sin(ballObject.direction) * ballObject.velocity;
  let color = ctx.getImageData(auxX, auxY, 100, 100);

  //Si no es blanco
  if (color.data[0] < 254) {
    ballObject.direction += Math.PI;
  }

  ballObject.posX += (Math.cos(ballObject.direction)) * ballObject.velocity;
  ballObject.posY += (Math.cos(ballObject.direction)) * ballObject.velocity;
};

  // checkBordes();

  // ballObject.posX += Math.cos(ballObject.direction) * ballObject.velocity;
  // ballObject.posY += Math.sin(ballObject.direction) * ballObject.velocity;

  contextBall.drawImage(ballObject.img, ballObject.posX, ballObject.posY, ballObject.height, ballObject.width); 

  clearTimeout(temp);
  temp = setTimeout('update()', 16);
}


function checkBordes() {
  if (ballObject.posX > 512) { // IZQUIERDA
      ballObject.posX = 512;
      ballObject.direction += Math.PI;
    } else if (ballObject.posX < 0) { //DERECHA
      ballObject.posX = 0;
      ballObject.direction += Math.PI;
    }

    if (ballObject.posY > 512) { //ARRIBA
      ballObject.posY = 512;
      ballObject.direction += Math.PI;
    } else if (ballObject.posY < 0) { //ABAJO
      ballObject.posY = 0;
      ballObject.direction += Math.PI;
    }
}

// handle key pressed

