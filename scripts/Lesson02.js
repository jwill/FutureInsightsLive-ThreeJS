var Lesson02 = (function() {
    var self = this;
    self.prototype = new App();
    window.app = self.prototype;
    self.drawScene();
    return self;
});

Lesson02.prototype.drawScene = function () {
    var self = this.prototype;

    var whiteMaterial = new THREE.MeshBasicMaterial(
        {color: 0xFFFFFF}
    );

    var triGeometry = new THREE.Geometry();
    triGeometry.vertices.push(new THREE.Vector3(0,10,0));
    triGeometry.vertices.push(new THREE.Vector3(-10,-10,0));
    triGeometry.vertices.push(new THREE.Vector3(10,-10,0));

    triGeometry.faces.push(new THREE.Face3(0,1,2))
    
    var triangle = new THREE.Mesh(triGeometry,  whiteMaterial)

    self.scene.add(triangle)
}

window.Lesson02 = Lesson02;
