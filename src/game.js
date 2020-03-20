import Background from "./background";
const Background1URL = require("../assets/imgs/background-layer1.png");
const Background2URL = require("../assets/imgs/background-layer2.png");
const Background3URL = require("../assets/imgs/background-layer3.png");
const Background4URL = require("../assets/imgs/background-layer4.png");
const Background5URL = require("../assets/imgs/background-layer5.png");
const Background6URL = require("../assets/imgs/background-layer6.png");

import Player from "./player";
const PlayerURL = require("../assets/imgs/player/Cat-Hopper.png");

const Util = require("./util");
const drawGameOver = require("./gameover");

class Game {
    constructor(
        gameCanvas, 
        gameContext, 
        background1Context, 
        background2Context, 
        background3Context, 
        background4Context, 
        background5Context, 
        background6Context, 
    ) {
        this.gameCanvas = gameCanvas;
        this.gameContext = gameContext;

        this.background1Context = background1Context;
        this.background2Context = background2Context;
        this.background3Context = background3Context;
        this.background4Context = background4Context;
        this.background5Context = background5Context;
        this.background6Context = background6Context;
        
        this.obstacleInterval = 0;
        this.spawnRate = 60;
        this.nextSpawn = this.spawnRate + Util.getRandomIntInclusive(0, 25);
        this.obstacles = [];
        // this.score = new Score(1);
        this.muteMusic = false;

        this.jump = this.jump.bind(this);
        this.draw = this.draw.bind(this);
        // this.resetGame = this.resetGame.bind(this);

        this.createBackground(backgroundCtx, foregroundCtx);
        // this.setSounds();
        this.setButtonListeners();

        // Menu.setMenuButtons(this);
    }

    jump(e) {
        if (e.code === "Space" && this.gamePlaying) {
            e.preventDefault();
            if (!this.gameOver) {
                this.player.toggleJump();
            }
        }
    }

    setButtonListeners() {
        this.gameCanvas.addEventListener("keydown", this.jump);
        this.gameCanvas.addEventListener("keydown", this.resetGame);
    }

    // createObstacles() {

    // }

    // generateObstacle() {

    // }

    // setSounds() {

    // }

    createBackground(backgroundCtx, foregroundCtx) {
        const backgroundImg = new Image();
        backgroundImg.src = '../assets/imgs/bg.png';
        this.background = new Background(backgroundCtx, backgroundImg, -35, 1422, 0.8);

        const foregroundImg = new Image();
        foregroundImg.src = "../assets/imgs/foreground-trees.png";
        this.foreground = new Background(foregroundCtx, foregroundImg, 250, 720, 6);
    }

    start() {
        document.getElementById("game-canvas").focus();
        this.gamePlaying = true;
        this.gameOver = false;
        this.canReset = false;
        this.paused = false;
        const cat = document.getElementsByClassName("cat")[0];
        cat.className = "cat";
        this.trees = 0;
        this.player.position = [100, 210];
        this.draw();
    }

    draw() {
        requestAnimationFrame(this.draw);
        this.player.update(this.ctx);
        this.background.draw();
        this.foreground.draw();
    }
}

module.exports = Game;