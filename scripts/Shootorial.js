var Shootorial = (function() {
    var self = this;

    self.enemyShipManager = new EnemyShipManager();

    self.renderer = new THREE.WebGLRenderer({autoClear:true});
    self.renderer.setClearColor(new THREE.Color(0x000000));
    self.renderer.setSize(640, 600);

    // Set up orthographic camera
    self.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000);
    self.camera.position.z = 10;

    self.scene = new THREE.Scene();

    var container = document.querySelector('#container')

    if (container.hasChildNodes())
        container.replaceChild(self.renderer.domElement);
    else container.appendChild(self.renderer.domElement);
    self.scene.add(self.camera);
    self.drawScene();
    return self;
});

Shootorial.prototype.render = function() {
    var self = this;
    self.backgroundMesh.rotation.y -= 0.005;
    self.enemyShipManager.trySpawn();
    self.enemyShipManager.render();
    self.renderer.render(self.scene, self.camera);
};

Shootorial.prototype.drawScene = function () {
    var self = this;

    var whiteMaterial = new THREE.MeshBasicMaterial(
        {color: 0xFF00FF}
    );

    var backgroundGeometry = new THREE.CylinderGeometry(700, 700, window.innerHeight, 32);

    var texture = THREE.ImageUtils.loadTexture('images/shootorial/scrollingBackground.jpeg');
    var backgroundMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, map:texture});

    self.backgroundMesh = new THREE.Mesh (backgroundGeometry, backgroundMaterial);
    self.backgroundMesh.position.z = -200;
    self.scene.add(self.backgroundMesh);


    // create player
    var playerTexture = THREE.ImageUtils.loadTexture('images/shootorial/ship.png');
    // transparent: true acknowledges that there is an alpha channel
    var shipMaterial = new THREE.MeshBasicMaterial({
      color:0xFFFFFF, map:playerTexture, transparent: true, opacity: 1.0});
    var shipGeometry = new THREE.PlaneGeometry(100,50);

    self.ship = new THREE.Mesh(shipGeometry, shipMaterial);
    self.ship.position.set (-300, 0, 500);
    self.scene.add(self.ship);
}

window.animate = function () {
    requestAnimationFrame(window.animate);
    window.app.render();
}

window.Shootorial = Shootorial;
