var SNAKE_GAME = {};

SNAKE_GAME.game = function () {
  var ctx;
  var snake;
  var time = 500;
  SNAKE_GAME.blockSize = 10;

  function init() {
    ctx = document.getElementById('canvas').getContext('2d');
    snake = SNAKE_GAME.snake();
    start();
  }

  function start() {
    ctx.clearRect(0, 0, 200, 200);
    snake.move();
    snake.draw(ctx);
    setTimeout(start, time);
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
    var headPosition = positionArray[0].slice();
    window.onkeydown = function(event) {
      var e = event || window.event;
      var key = e.which || e.keyCode;
      
      switch(key) {
        case 38: // Up
          headPosition[1] -= 1;
          break;
        case 40: // Down
          headPosition[1] += 1;
          break;
        case 37: // Left
          headPosition[0] -= 1;
          break;
        case 39 : // Right
          headPosition[0] += 1;
          break;
        default: 
          return true;
      }    
      return false;      
    }

    positionArray.unshift(headPosition);
    positionArray.pop();
  }

  function draw(ctx) {
    ctx.save();
    ctx.fillStyle = 'green';
    for(var i = 0; i < positionArray.length; i++) {
      drawSection(ctx, positionArray[i]);
    }
    ctx.restore();
  } 

  function drawSection(ctx, position) {
    var x = SNAKE_GAME.blockSize * position[0];
    var y = SNAKE_GAME.blockSize * position[1];
    ctx.fillRect(x, y, SNAKE_GAME.blockSize, SNAKE_GAME.blockSize);
  }

  return {
    move: move,
    draw: draw
  };
}

window.addEventListener('load', function() {
  SNAKE_GAME.game.init();
});