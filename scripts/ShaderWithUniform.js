var ShaderWithUniform = (function() {
    var self = this;
    self.prototype = new App();
    window.app = self.prototype;

    // so app has a reference to outer object
    window.app.outer = self;
    self.prototype.clock = new THREE.Clock();
    self.drawScene();
    return self;
});

ShaderWithUniform.prototype.createShaders = function () {
  this.vShader = "" +
    "void main(void) { "+
      "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);" +
    "}";

  this.pShader = "" +
    "uniform float time; "+
    "void main(void) {"+
      "float r = cos(time);"+
      "float g = sin(time);"+
      "float b = tan(time);"+
      "gl_FragColor = vec4(r, 1.0 - g, b, 1.0);"+
    "}";

  this.uniforms = {
    time: {type: 'f', value: 0.0}
  };

  this.shaderMaterial = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: this.vShader,
    fragmentShader: this.pShader
  });
};

ShaderWithUniform.prototype.drawScene = function () {
    var self = this.prototype;

    this.createShaders();
    self.cube = new THREE.Mesh(
        new THREE.BoxGeometry(50, 50, 50, 32, 32, 32), this.shaderMaterial
    );

    self.scene.add(self.cube);
}

// Override App's render class
App.prototype.render = function () {
    var self = this;
    var delta = 5 * self.clock.getDelta();
    self.outer.uniforms.time.value += 0.2 * delta;
    self.cube.rotation.y += 0.1 * delta;

    self.renderer.render(self.scene, self.camera);
};

window.ShaderWithUniform = ShaderWithUniform;
