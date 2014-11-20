var SNAKE = {};

var Snake = (function () {
  var canvas;
  var ctx;
  var xPosition = 0;
  var yPosition = 0;
  var frameLength = 500;

  function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
    start();
  }

  function start() {
    xPosition += 2;
    yPosition += 4;
    ctx.clearRect(0, 0, 100, 100);
    ctx.fillStyle = 'blue';
    ctx.fillRect(xPosition, yPosition, 30, 50);
    setTimeout(start, frameLength);
  }

  return {
    init: init
  };
})();


window.addEventListener('load', function() {
  Snake.init();
});