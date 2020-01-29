function Animation(spritesheet, frameSpeed, startFrame, endFrame) {
    var animationSequence = [];
    var currentFrame = 0;
    var counter = 0;

    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++) {
        animationSequence.push(frameNumber); // double check this
    } 

    this.update = function() {
        if (counter === (frameSpeed - 1)) {
            currentFrame = (currentFrame + 1) % animationSequence.length;
        }
        counter = (counter + 1) % frameSpeed;
    };


}

export default Animation;