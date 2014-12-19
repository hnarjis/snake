var SNAKE_GAME = {};

SNAKE_GAME.game = function () {
  var ctx;
  var snake;
  var food;
  var timeout = 400;
  SNAKE_GAME.blockSize = 10;
  var keyMappings = {38:'up', 40:'down', 37:'left', 39:'right'};

  function init() {
    ctx = document.getElementById('canvas').getContext('2d'); 
    snake = SNAKE_GAME.snake();
    food = SNAKE_GAME.food(randomizePosition());
    window.onkeydown = handleKeys;
    loop();
  }

  function loop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    snake.turn();
    snake.draw(ctx);
    food.draw(ctx);
    setTimeout(loop, timeout);
  }

  function handleKeys(event) {
    var e = event || window.event;
    var key = e.which || e.keyCode;
    var direction = keyMappings[key];

    if (direction) {
      snake.setDirection(direction);
      event.preventDefault();
      return false;
    }
    return true;
  }

  function randomizePosition() {
    var gridWidth = ctx.canvas.width/SNAKE_GAME.blockSize;
    var gridHeight = ctx.canvas.height/SNAKE_GAME.blockSize;
    var x = 1 + Math.round((gridWidth-2) * Math.random());
    var y = 1 + Math.round((gridHeight-2) * Math.random());
    return [x, y];
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
  var direction = 'right';
  var nextDirection = direction;

  function setDirection(newDirection) {
    var allowedDirections;

    switch (direction) {
      case 'left':
      case 'right':
        allowedDirections = ['up', 'down'];
        break;
      case 'up':
      case 'down':
        allowedDirections = ['left', 'right'];
        break;
      default:
        throw new Exception('Invalid direction.');
    }

    if (allowedDirections.indexOf(newDirection) > -1) {
      nextDirection = newDirection;
    }
  }

  function turn() {
    var nextPosition = positionArray[0].slice();
    direction = nextDirection;

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
    turn: turn,
    setDirection: setDirection
  };
} 

SNAKE_GAME.food = function(position) {
  function draw(ctx) {
    ctx.save();
    var x = SNAKE_GAME.blockSize * (position[0] + 1/2);
    var y = SNAKE_GAME.blockSize * (position[1] + 1/2);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  return {
    draw: draw
  };
}

window.onload = function() {
  SNAKE_GAME.game.init();
}