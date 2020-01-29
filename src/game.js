(function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var player = {};
    var ground = [];
    var platformWidth = 32;
    var platformHeight = canvas.height - platformWidth * 4;

    // Load all the images
    var assetLoader = (function() {
        this.imgs = {
            "bg": "imgs/bg.png",
            "backdrop" : "imgs/foreground-trees.png",
            "backdrop2" : "imgs/mountain-far.png",
            "backdrop3" : "imgs/mountains.png",
            "backdrop4" : "imgs/trees.png",
            "avatar" : "imgs/character.png"
        };

        var assetsLoaded = 0;
        var numImgs = Object.keys(this.imgs).length;
        this.totalAsset = numImgs;

        // function assetLoaded(dic, name) {
        //     if (this[dic][name].status !==)
        // }
    })
});

export default Game;