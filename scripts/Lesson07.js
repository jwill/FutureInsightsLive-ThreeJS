var Lesson07 = (function() {
    var self = this;
    self.prototype = new App();
    window.app = self.prototype;
    window.app.outer = self;
    self.setupGUI();

    // Create lights
    var parent = self.prototype;

    var color = new THREE.Color();
    color.setRGB(this.params.ambientR, this.params.ambientG, this.params.ambientB);
    var lightA = new THREE.AmbientLight({color: color});
    parent.scene.add(lightA);

    color.setRGB(this.params.directionR, this.params.directionG, this.params.directionB);
    var lightD = new THREE.DirectionalLight(color, 1.0);
    lightD.position.set(this.params.directionX, this.params.directionY, this.params.directionZ);
    parent.scene.add(lightD);

    self.drawScene();
    return self;
});

Lesson07.prototype.setupGUI = function() {
    var self = this.prototype;
    // Create GUI
    this.gui = new dat.GUI({
	height : 9 * 32 - 1
    });
    this.params = { 
	'directionX': 0,
	'directionY': 100,
	'directionZ': -1.0,
	'directionR': 0.8,
	'directionG': 0.8,
	'directionB': 0.8,
	'ambientR': 0.2,
	'ambientG': 0.2,
	'ambientB': 0.2,
	'useLighting': true
    };
    this.gui.add(this.params, 'directionX').onFinishChange(this.changeDirectionVector);
    this.gui.add(this.params, 'directionY').onFinishChange(this.changeDirectionVector);
    this.gui.add(this.params, 'directionZ').onFinishChange(this.changeDirectionVector);

    this.gui.add(this.params, 'directionR', 0.0, 1.0).onFinishChange(this.changeDirectionLightRGB);
    this.gui.add(this.params, 'directionG', 0.0, 1.0).onFinishChange(this.changeDirectionLightRGB);
    this.gui.add(this.params, 'directionB', 0.0, 1.0).onFinishChange(this.changeDirectionLightRGB);

    this.gui.add(this.params, 'ambientR', 0.0, 1.0).onFinishChange(this.changeAmbientLightRGB);
    this.gui.add(this.params, 'ambientG', 0.0, 1.0).onFinishChange(this.changeAmbientLightRGB);
    this.gui.add(this.params, 'ambientB', 0.0, 1.0).onFinishChange(this.changeAmbientLightRGB);

    this.gui.add(this.params, 'useLighting').onFinishChange(this.toggleLighting);
}

Lesson07.prototype.toggleLighting = function () {
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

Lesson07.prototype.changeAmbientLightRGB = function() {
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

Lesson07.prototype.changeDirectionalLightRGB = function() {
    console.log("changed directional");
    var parent = window.app;
    var children = parent.scene.children;
    for (var i = 0; i < children.length; i++) {
	var child = children[i];
	if (child instanceof THREE.DirectionalLight) {
	    child.color.setRGB(
		parent.outer.params.ambientR,
		parent.outer.params.ambientG,
		parent.outer.params.ambientB
	    );
	    break;
	}
    }
}

Lesson07.prototype.drawScene = function () {
    var self = this.prototype;

    var texture = THREE.ImageUtils.loadTexture('images/crate.gif');
    var material = new THREE.MeshPhongMaterial({color: 0xFFFFFF , map: texture});

    self.cube = new THREE.Mesh(
        new THREE.BoxGeometry(30, 30, 30, 32, 32, 32), material
    );
    self.cube.position.z = -30;

    self.scene.add(self.cube);
}

// Override App's render class
App.prototype.render = function () {
    var self = this;
    self.cube.rotation.x += 0.01;
    self.cube.rotation.y += 0.01;

    self.renderer.render(self.scene, self.camera);
};

window.Lesson07 = Lesson07;
