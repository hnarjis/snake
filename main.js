var Game = function () {
  var ctx;
  var xPosition = 1;
  var yPosition = 1;
  var time = 100;

  function init() {
	  ctx = document.getElementById('canvas').getContext('2d');
    start();
  }

  function start() {
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
    
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = 'green';
    ctx.fillRect(xPosition, yPosition, 20, 10);
    setTimeout(start, time);
  }

  return {
    init: init
  };
}();

window.addEventListener('load', function() {
  Game.init();
});