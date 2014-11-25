var Game = function () {
  var ctx;
  var size = 10;
  var time = 500;
  var positionArray = [];
  positionArray.push([6, 4]);
  positionArray.push([5, 4]);
  positionArray.push([4, 4]);

  function init() {
    ctx = document.getElementById('canvas').getContext('2d');
    start();
  }

  function start() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    move();
    draw(ctx);
    setTimeout(start, time);
  }

  function move() {
    var nextPosition = positionArray[0].slice();
    window.onkeydown = function(event) {
      var e = event || window.event;
      var key = e.which || e.keyCode;
      
      switch(key) {
        case 38: // Up
          nextPosition[1] -= 1;
          break;
        case 40: // Down
          nextPosition[1] += 1;
          break;
        case 37: // Left
          nextPosition[0] -= 1;
          break;
        case 39 : // Right
          nextPosition[0] += 1;
          break;
        default: 
          return true;
      }    
      return false;
    }

    positionArray.unshift(nextPosition);
    positionArray.pop();
  }


  function draw(ctx) {
    ctx.save();
    ctx.fillStyle = 'green';
    for(var i = 0; i < positionArray.length; i++) {
      var x = size * positionArray[i][0];
      var y = size * positionArray[i][1];
      ctx.fillRect(x, y, size, size);
    }
    ctx.restore();
  }  

  return {
    init: init
  };
}();

window.addEventListener('load', function() {
  Game.init();
});