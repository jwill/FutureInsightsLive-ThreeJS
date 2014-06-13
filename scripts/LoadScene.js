var LoadScene = (function() {
    var self = this;
    self.prototype = new App();
    window.app = self.prototype;

    var loader = new THREE.SceneLoader();
    loader.callbackProgress = this.callbackProgress;
    loader.load("scripts/scenes/falling-ball.js", this.callbackFinished);

    return self;
});

LoadScene.prototype.callbackProgress = function (progress, result) {
    console.log(progress);
    console.log(result);
};

LoadScene.prototype.callbackFinished = function (result) {
    var self = window.app;

    self.scene = result.scene;
    self.camera = result.cameras.Camera;
    self.camera.lookAt(new THREE.Vector3(0,0,0));
};

window.LoadScene = LoadScene;
