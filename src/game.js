const Player = require("./player");
const Background = require("./background");
// const Tree = require("./tree");
const Util = require("./util");
const drawGameOver = require("./gameover");
// const Menu = require("./menu");

class Game {
    constructor(ctx, gameCanvas, backgroundCtx, foregroundCtx) {
        this.ctx = ctx;
        this.gameCanvas = gameCanvas;
        this.player = new Player({ position: [100, 210] });
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
        // this.obstacles = [];
        // this.birds = diffOptions.birds;
        // this.score.multiplier = diffOptions.multiplier;
        // this.maxTrees = diffOptions.maxTrees;
        // this.maxObstacles = diffOptions.maxObstacles;
        this.draw();
    }

    draw() {
        requestAnimationFrame(this.draw);
        this.player.update(this.ctx);
        // this.createObstacles();
        this.background.draw();
        this.foreground.draw();
    }
}

module.exports = Game;