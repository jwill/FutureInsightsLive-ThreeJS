var Lesson02B = (function() {
    var self = this;
    self.prototype = new App();
    window.app = self.prototype;
    self.drawScene();
    return self;
});

Lesson02B.prototype.drawScene = function () {
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

    var verts = [[10, 10, 0], [-10, 10, 0], [10, -10, 0], [-10, -10, 0]]

    var faces = [[0,1,2], [2,1,3] ]

    var squareGeometry = self.makeGeometry(verts, faces)
    
    var square = new THREE.Mesh(squareGeometry, whiteMaterial)
    square.position.x = 25

    self.scene.add(triangle);
    self.scene.add(square);
}

window.Lesson02B = Lesson02B;
