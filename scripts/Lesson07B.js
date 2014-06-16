var Lesson07B = (function() {
    var self = this;
    self.prototype = new App();
    window.app = self.prototype;
    window.app.outer = self;
    self.setupGUI();


    // Create lights
    var parent = self.prototype;
    parent.renderer.antialias = true;
    parent.renderer.shadowMapEnabled = true;
    parent.renderer.shadowMapSoft = true;

    var color = new THREE.Color();
    color.setRGB(this.params.ambientR, this.params.ambientG, this.params.ambientB);
    var lightA = new THREE.AmbientLight({color: color});
    parent.scene.add(lightA);

    color.setRGB(this.params.directionR, this.params.directionG, this.params.directionB);

    var spotLight = new THREE.SpotLight( 0xff0000 );
    spotLight.position.set(this.params.spotlightX, this.params.spotlightY, this.params.spotlightZ);

    spotLight.castShadow = true;

    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;

    spotLight.shadowCameraNear = 3;
    spotLight.shadowCameraFar = parent.camera.far;
    spotLight.shadowCameraFov = 30;
    spotLight.distance = 1000;
    spotLight.shadowCameraVisible = this.params.shadowCameraVisible;
    parent.scene.add(spotLight);

    self.drawScene();
    return self;
});

Lesson07B.prototype.setupGUI = function() {
    var self = this.prototype;
    // Create GUI
    this.gui = new dat.GUI({
	height : 9 * 32 - 1
    });
    this.params = { 
	'spotlightX': 100,
	'spotlightY': 50,
	'spotlightZ': 100,
	'ambientR': 0.2,
	'ambientG': 0.2,
	'ambientB': 0.2,
	'shadowCameraVisible': true
    };
    this.gui.add(this.params, 'spotlightX', -100, 100).onFinishChange(this.changeSpotLightPosition);
    this.gui.add(this.params, 'spotlightY', 0, 100).onFinishChange(this.changeSpotLightPosition);
    this.gui.add(this.params, 'spotlightZ', -100, 100).onFinishChange(this.changeSpotLightPosition);

    this.gui.add(this.params, 'ambientR', 0.0, 1.0).onFinishChange(this.changeAmbientLightRGB);
    this.gui.add(this.params, 'ambientG', 0.0, 1.0).onFinishChange(this.changeAmbientLightRGB);
    this.gui.add(this.params, 'ambientB', 0.0, 1.0).onFinishChange(this.changeAmbientLightRGB);

    this.gui.add(this.params, 'shadowCameraVisible').onFinishChange(this.toggleShadowCamera);
}

Lesson07B.prototype.toggleLighting = function () {
    var parent = window.app;
    var children = parent.scene.children;
    for (var i = 0; i < children.length; i++) {
	var child = children[i];
	if (child instanceof THREE.Light) {
	    if (parent.outer.params.useLighting == true) {
		child.intensity = 1.0;
	    } else {
		child.intensity = 0;
	    }
	}
    }
    console.log("toggled lighting");
}

Lesson07B.prototype.toggleShadowCamera = function () {
    var parent = window.app;
    var children = parent.scene.children;
    for (var i = 0; i < children.length; i++) {
	var child = children[i];
	if (child instanceof THREE.SpotLight) {
	    if (parent.outer.params.shadowCameraVisible == true) {
		console.log(child);
		child.shadowCameraVisible = true;
	    } else {
		child.shadowCameraVisible = false;
	    }
	}
    }
    console.log("toggled shadow camera");
}

Lesson07B.prototype.changeAmbientLightRGB = function() {
    console.log("changed ambient");
    var parent = window.app;
    var children = parent.scene.children;
    for (var i = 0; i < children.length; i++) {
	var child = children[i];
	if (child instanceof THREE.AmbientLight) {
	    child.color.setRGB(
		parent.outer.params.ambientR,
		parent.outer.params.ambientG,
		parent.outer.params.ambientB
	    );
	    break;
	}
    }
}

Lesson07B.prototype.changeSpotLightPosition = function() {
    console.log("changed directional");
    var parent = window.app;
    var children = parent.scene.children;
    for (var i = 0; i < children.length; i++) {
	var child = children[i];
	if (child instanceof THREE.SpotLight) {
	    child.position.set(
		parent.outer.params.spotlightX,
		parent.outer.params.spotlightY,
		parent.outer.params.spotlightZ
	    );
	    break;
	}
    }
}

Lesson07B.prototype.drawScene = function () {
    var self = this.prototype;

    var texture = THREE.ImageUtils.loadTexture('images/crate.gif');
    var material = new THREE.MeshPhongMaterial({color: 0xFFFFFF , map: texture});

    self.cube = new THREE.Mesh(
        new THREE.BoxGeometry(30, 30, 30, 32, 32, 32), material
    );
    
    var plane = new THREE.Mesh(
	new THREE.PlaneGeometry(500,500), 
	new THREE.MeshPhongMaterial({color: 0x00FF00, ambient: 0x888888, side: THREE.DoubleSide})
    );
    plane.rotation.x = 90;
    plane.position.y = -50;
    plane.receiveShadow = true;

    self.cube.position.z = -30;
    self.cube.castShadow = true;

    self.scene.add(self.cube);
    self.scene.add(plane);
}

// Override App's render class
App.prototype.render = function () {
    var self = this;
    self.cube.rotation.x += 0.01;
    self.cube.rotation.y += 0.01;

    self.renderer.render(self.scene, self.camera);
};

window.Lesson07B = Lesson07B;
