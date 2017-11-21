/**
 * Canvas
 */
const canvasObstacle = document.getElementById("object");
let contextObstacle = canvasObstacle.getContext("2d");
contextObstacle.canvas.width = 1020;
contextObstacle.canvas.height = 512;
contextObstacle.font = "13px arial";

/**
 * Init datas
 */
let tempObs;
let obstacles = [];
const totalObstacles = 7;

const postionsX = [225, 175, 275 , 35, 405, 105, 335];
const postionsY = [100, 370, 250, 40, 60, 460, 100];
const colors = ["red", "blue", "green", "yellow", "purple", "pink", "orange"];

initialize();

let n = 0;
let posText = 35;
window.setInterval(function(){
  n++;
},1000);


/**
 * @method initialize init method
 */
function initialize() {
  for(i=0; i < totalObstacles; i++){
    const obstacle = {
      posX: postionsX[i],
      posY: postionsY[i],
      dir: Math.PI * 2,
      vel: 2,
      height: 12,
      width: 12,
      color: colors[Math.floor(Math.random() * 6)],
    };
    obstacles.push(obstacle);
  }
  tempObs = setTimeout("update()", 18);
  update();
}

/**
 * @method update loop method
 */
function update() {
  contextObstacle.clearRect(0, 0, contextObstacle.canvas.width, contextObstacle.canvas.height);
  contextObstacle.fillStyle = "black";
  contextObstacle.fillText(`Cuadrados Totales: ${totalObstacles}`, 530, 20);
  contextObstacle.fillText(`Cuadrados en el laberitnto: ${obstacles.length}`, 530, 35);

  for (i = 0; i < obstacles.length; i++) {
    const auxX = obstacles[i].posX + (obstacles[i].width / 2) + Math.cos(obstacles[i].dir) * obstacles[i].vel; // Miro hacia donde voy en X
    const auxY = obstacles[i].posY + (obstacles[i].height / 2) + Math.sin(obstacles[i].dir) * obstacles[i].vel; // Miro hacia donde voy en Y
    let color = ctx.getImageData(auxX, auxY, 1, 1); // Miro el color en ese punto

    if (color.data[0] < 150) { //Colisión con los bordes
      obstacles[i].dir += Math.random() * 4 * (Math.PI / 2);
    } else {
      for (j = 0; j < obstacles.length; j++) {
        if(Math.abs(Math.floor(obstacles[i].posX) - Math.floor(obstacles[j].posX)) <= 2
          && Math.abs(Math.floor(obstacles[i].posY) - Math.floor(obstacles[j].posY)) <= 2
          &&  i != j) {
            obstacles[i].dir += Math.PI;
            obstacles[j].dir += Math.PI;
        }
      }
      obstacles[i].posX += Math.cos(obstacles[i].dir) * obstacles[i].vel;
      obstacles[i].posY += Math.sin(obstacles[i].dir) * obstacles[i].vel;
    }


    if(obstacles[i].posY < 10 || obstacles[i].posX > 490) {
      obstacles.splice(i, 1);
      posText += 15;
      ctx.fillText(`Cuadrado: ${i} Tiempo: ${n} segundos`, 530, posText);
    } else {
      contextObstacle.fillStyle = obstacles[i].color;
      contextObstacle.fillRect(obstacles[i].posX, obstacles[i].posY, obstacles[i].width, obstacles[i].height);
    }
  }
  
  clearTimeout(tempObs);
  tempObs = setTimeout("update()", 1000/60);
}