var SNAKE_GAME = {};

SNAKE_GAME.game = function () {
  var ctx;
  var timeout = 500;
  SNAKE_GAME.blockSize = 10;

  function init() {
    ctx = document.getElementById('canvas').getContext('2d'); 
    snake = SNAKE_GAME.snake();
    window.onkeydown = keyHandler;
    loop();
  }

  function loop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    snake.draw(ctx);
    setTimeout(loop, timeout);
  }

  function keyHandler(event) {
    var e = event || window.event;
    var key = e.which || e.keyCode;
    var keyMappings = {38:'up', 40:'down', 37:'left', 39:'right'};

    if (key in keyMappings) {
      snake.move(keyMappings[key]);
      return true;
    }
    return false;
  }

  return {
    init: init
  };
}();

SNAKE_GAME.snake = function() {
  var positionArray = [];
  positionArray.push([3, 1]);
  positionArray.push([2, 1]);
  positionArray.push([1, 1]);

  function move(direction) {
    var nextPosition = positionArray[0].slice();
    
    switch(direction) {
      case 'up':
        nextPosition[1] -= 1;
        break;
      case 'down':
        nextPosition[1] += 1;
        break;
      case 'left':
        nextPosition[0] -= 1;
        break;
      case 'right':
        nextPosition[0] += 1;
        break;
      default: 
        throw new Exception('Invalid direction.');
    }    
    positionArray.unshift(nextPosition);
    positionArray.pop();
  }

  function draw(ctx) {
    ctx.save();
    ctx.fillStyle = 'green';
    for(var i = 0; i < positionArray.length; i++) {
      var x = SNAKE_GAME.blockSize * positionArray[i][0];
      var y = SNAKE_GAME.blockSize * positionArray[i][1];
      ctx.fillRect(x, y, SNAKE_GAME.blockSize, SNAKE_GAME.blockSize);
    }
    ctx.restore();
  }

  return {
    draw: draw,
    move: move
  };
} 

window.onload = function() {
  SNAKE_GAME.game.init();
}