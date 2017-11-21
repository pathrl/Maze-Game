/**
 * @method checkBordes Comprueba que el pez esta dentro del canvas
 * @param {Object} fish Fish Item
 */
export default function checkBordes(object) {
  if (object.posX > 512) { // IZQUIERDA
      object.posX = 512;
      object.direction += Math.PI;
    } else if (object.posX < 0) { //DERECHA
      object.posX = 0;
      object.direction += Math.PI;
    }

    if (object.posY > 512) { //ARRIBA
      object.posY = 512;
      object.direction += Math.PI;
    } else if (object.posY < 0) { //ABAJO
      object.posY = 0;
      object.direction += Math.PI;
    }

    return object;
  }