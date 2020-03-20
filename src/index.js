const Player = require("./player.js");
const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", () => {

  const gameCanvas = document.getElementById("game-canvas");
  gameCanvas.width = WIDTH;
  gameCanvas.height = HEIGHT;
  const gameContext = gameCanvas.getContext("2d");

  const background1Canvas = document.getElementById("background1-canvas");
  background1Canvas.width = WIDTH;
  background1Canvas.height = HEIGHT;
  const background1Context = background1Canvas.getContext("2d");

  const background2Canvas = document.getElementById("background2-canvas");
  background2Canvas.width = WIDTH;
  background2Canvas.height = HEIGHT;
  const background2Context = background2Canvas.getContext("2d");

  const background3Canvas = document.getElementById("background3-canvas");
  background3Canvas.width = WIDTH;
  background3Canvas.height = HEIGHT;
  const background3Context = background3Canvas.getContext("2d");

  

  const foregroundCanvas = document.getElementById("foreground-canvas");
  const foregroundCanvasContext = foregroundCanvas.getContext("2d");

  const game = new Game(
    canvasContext,
    gameCanvas,
    backgroundCanvasContext,
    foregroundCanvasContext
  );

});