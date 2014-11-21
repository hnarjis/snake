var Game = function () {
  var ctx;
  var xPosition = 0;
  var yPosition = 1;
  var time = 100;

  function init() {
	  ctx = document.getElementById('canvas').getContext('2d');
    start();
  }

  function start() {
    xPosition += 2;
    //yPosition += 4;
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