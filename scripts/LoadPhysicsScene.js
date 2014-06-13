var LoadPhysicsScene = (function() {
    var self = this;
    self.prototype = new App();
    window.app = self.prototype;

    var loader = new THREE.SceneLoader();
    loader.callbackProgress = this.callbackProgress;
    loader.load("scripts/scenes/falling-ball.js", this.callbackFinished);

    Physijs.scripts.worker = 'scripts/physi/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';

    self.prototype.scene = new Physijs.Scene();
    self.prototype.scene.setGravity(new THREE.Vector3(0, -30, 0));

    return self;
});

LoadPhysicsScene.prototype.callbackProgress = function (progress, result) {
    console.log(progress);
    console.log(result);
};

App.prototype.createSimpleObject = function (meshType, rawMesh, mass, friction, res) {
    var material, obj;
    if (friction == null) {
      material = Physijs.createMaterial(rawMesh.material, friction, res);
    } else material = rawMesh.material;

    obj = new meshType(rawMesh.geometry, material, mass);
    obj.scale.set(rawMesh.scale.x, rawMesh.scale.y, rawMesh.scale.z);
    obj.rotation.set(rawMesh.rotation.x, rawMesh.rotation.y, rawMesh.rotation.z);
    obj.position.set(rawMesh.position.x, rawMesh.position.y, rawMesh.position.z);

    return obj;
};

LoadPhysicsScene.prototype.callbackFinished = function (result) {
    var self = window.app;

    self.camera = result.cameras.Camera;
    self.camera.lookAt(self.scene.position);
    self.scene.add(self.camera);

    ball = result.objects.Ball;
    ballMesh = self.createSimpleObject(Physijs.SphereMesh, ball);
    // Sets ground mass to 0 (or immovable)
    floor = result.objects.Floor;
    groundMesh = self.createSimpleObject(Physijs.BoxMesh, floor, 0);

    ramp1 = result.objects.Ramp1;
    ramp1Mesh = self.createSimpleObject(Physijs.BoxMesh, ramp1, 0);

    ramp2 = result.objects.Ramp2;
    ramp2Mesh = self.createSimpleObject(Physijs.BoxMesh, ramp2, 0);

    self.scene.add(ballMesh);
    self.scene.add(groundMesh);
    self.scene.add(ramp1Mesh);
    self.scene.add(ramp2Mesh);
};

App.prototype.render = function() {
    var self = this;
    self.scene.simulate();
    self.renderer.render(self.scene, self.camera);
};

window.LoadPhysicsScene = LoadPhysicsScene;
