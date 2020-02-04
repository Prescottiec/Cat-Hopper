/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Background {
    constructor(ctx, image, posY, imageLength, speed) {
        this.image = image;
        this.speed = speed;
        this.posX = 0;
        this.posY = posY;
        this.imageLength = imageLength;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.clearRect(0, 0, 800, 300);
        this.ctx.drawImage(this.image, this.x, this.y);
        this.ctx.drawImage(this.image, this.x + this.imageLength, this.y);
        if (this.imageLength < 800) {
            this.ctx.drawImage(this.image, this.x + this.imageLength * 2, this.y);
        }
        if (this.x <= -this.imageLength) {
            this.x = 0;
        }
        this.scrollImage();
    }

    scrollImage() {
        this.x -= this.speed;
    }
};

module.exports = Background;

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(/*! ./player */ "./src/player.js");
const Background = __webpack_require__(/*! ./background */ "./src/background.js");
// const Tree = require("./tree");
const Util = __webpack_require__(/*! ./util */ "./src/util.js");
const drawGameOver = __webpack_require__(/*! ./gameover */ "./src/gameover.js");
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

/***/ }),

/***/ "./src/gameover.js":
/*!*************************!*\
  !*** ./src/gameover.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

const drawGameOver = ctx => {
  const text1 = "GAME OVER";
  const text2 = "Press space to reset the game";
  ctx.font = "48px VT323";
  ctx.fillStyle = "#fef86c";
  ctx.textAlign = "center";
  ctx.strokeText(text1, 400, 150);
  ctx.fillText(text1, 400, 150);
  ctx.font = "32px VT323";
  ctx.strokeText(text2, 400, 180);
  ctx.fillText(text2, 400, 180);
};

module.exports = drawGameOver;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(/*! ./player.js */ "./src/player.js");
const Game = __webpack_require__(/*! ./game.js */ "./src/game.js");

document.addEventListener("DOMContentLoaded", () => {
  const gameCanvas = document.getElementById("game-canvas");
  const canvasContext = gameCanvas.getContext("2d");

  const backgroundCanvas = document.getElementById("background-canvas");
  const backgroundCanvasContext = backgroundCanvas.getContext("2d");

  const foregroundCanvas = document.getElementById("foreground-canvas");
  const foregroundCanvasContext = foregroundCanvas.getContext("2d");

  const game = new Game(
    canvasContext,
    gameCanvas,
    backgroundCanvasContext,
    foregroundCanvasContext
  );

  // game.openMenu();
});



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

const SPRITES = {
  walk1: [15, 11, 48, 64],
  walk2: [187, 9, 34, 66],
  walk3: [227, 11, 56, 64],
  jump: [133, 11, 48, 64]
};

const PLAYER_HITBOX_OFFSET = {
  posX: 3,
  posY: 9,
  sizeX: 27,
  sizeY: 50,
};

class Player {
  constructor(options) {
    this.position = options.position;
    this.walkspeed = options.walkspeed ? options.walkspeed : 1;
    this.falling = false;
    this.jumping = false;
    this.jumpCount = 0;
    this.spriteSheet = new Image();
    this.spriteSheet.src = "../assets/imgs/character-sprites.png";
    this.walkCycle = 0;
    this.gameOver = false;
  }

  jump() {
    const gravity = 0.4;
    const initialSpeed = 12;
    if (this.jumping) {
      if (this.jumpCount === 0 || !this.onGround()) {
        this.position[1] -= initialSpeed - gravity * this.jumpCount;
        this.jumpCount += 1;
      } else {
        this.position[1] = 210;
        this.jumpCount = 0;
        this.jumping = false;
      }
    }
  }

  onGround() {
    return this.position[0] === 100 && this.position[1] >= 210;
  }

  toggleJump() {
    this.jumping = true;
    if (this.onGround()) this.jumpSound.play();
  }

  getSprite() {
    if (this.gameOver) {
      return SPRITES.gameOver;
    } else if (!this.onGround()) {
      return SPRITES.jump;
    } else if (this.walkCycle < 10) {
      this.walkCycle += 1;
      return SPRITES.walk1;
    } else if (this.walkCycle < 20) {
      this.walkCycle += 1;
      return SPRITES.walk2;
    } else if (this.walkCycle < 30) {
      this.walkCycle += 1;
      return SPRITES.walk3;
    } else if (this.walkCycle < 39) {
      this.walkCycle += 1;
      return SPRITES.walk2;
    } else {
      this.walkCycle = 0;
      return SPRITES.walk2;
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 800, 300);
    const sprite = this.getSprite();
    ctx.drawImage(
      this.spriteSheet,
      sprite[0],
      sprite[1],
      sprite[2],
      sprite[3],
      this.position[0],
      this.position[1],
      sprite[2],
      sprite[3]
    );
  }

  update(ctx) {
    this.jump();
    this.draw(ctx);
  }
}

module.exports = Player;

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  },
  numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Print an integer in JS with commas as thousands separators
  },
  createCookie(name, value, days) {
      if (days) {
          const date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000)); // expires in 2038
          let expires = "; expires =" + date.toUTCString();
      } else {
          let expires = "";
      }
      document.cookie = name + "=" + value + expires + "; path=/";
  },
  readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for ( var i = 0; i < ca.length; i++ ) {
          var c = ca[i];
          while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
          }
          if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
          }
      }
      return null;
  }
};

module.exports = Util;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map