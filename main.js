var SNAKE_GAME = {};

SNAKE_GAME.game = function () {
  var ctx;
  var timeout = 100;
  SNAKE_GAME.blockSize = 10;

  function init() {
    ctx = document.getElementById('canvas').getContext('2d'); 
    snake = SNAKE_GAME.snake();
    start();
  }

  function start() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    snake.move();
    snake.draw(ctx);
    setTimeout(start, timeout);
  }

  return {
    init: init
  };
}();

SNAKE_GAME.snake = function() {
  var positionArray = [];
  positionArray.push([6, 4]);
  positionArray.push([5, 4]);
  positionArray.push([4, 4]);

  function move() {
    window.onkeydown = function(event) {
      var e = event || window.event;
      var key = e.which || e.keyCode;
      
      switch(key) {
        case 38: // Up
          yPosition -= 1;
          break;
        case 40: // Down
          yPosition += 1;
          break;
        case 37: // Left
          xPosition -= 1;
          break;
        case 39 : // Right
          xPosition += 1;
          break;
        default: 
          return true;
      }    
      return false;
    }
  }

  function draw(ctx) {
    ctx.fillStyle = 'green';
    for(var i = 0; i < positionArray.length; i++) {
      var x = SNAKE_GAME.blockSize * positionArray[i][0];
      var y = SNAKE_GAME.blockSize * positionArray[i][1];
      ctx.fillRect(x, y, SNAKE_GAME.blockSize, SNAKE_GAME.blockSize);
    }
  }

  return {
    draw: draw,
    move: move
  };
} 

window.onload = function() {
  SNAKE_GAME.game.init();
}