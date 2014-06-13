var Lesson06 = (function() {
    var self = this;
    self.prototype = new App();
    window.app = self.prototype;
    self.drawScene();
    return self;
});

Lesson06.prototype.drawScene = function () {
    var self = this.prototype;

    var texture = THREE.ImageUtils.loadTexture('images/HTML5_Logo_256.png');
    var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, map: texture});

    self.cube = new THREE.Mesh(
        new THREE.BoxGeometry(50, 50, 50, 32, 32, 32), material
    );

    self.scene.add(self.cube);
}

// Override App's render class
App.prototype.render = function () {
    var self = this;
    self.cube.rotation.x += 0.05;
    self.cube.rotation.y += 0.01;

    self.renderer.render(self.scene, self.camera);
};

window.Lesson06 = Lesson06;
