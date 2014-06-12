var Lesson03 = (function() {
    var self = this;
    self.prototype = new App();
    window.app = self.prototype;
    self.drawScene();
    return self;
});

Lesson03.prototype.drawScene = function () {
    var self = this.prototype;

    var triGeometry = new THREE.Geometry();
    triGeometry.vertices.push(new THREE.Vector3(0,10,0));
    triGeometry.vertices.push(new THREE.Vector3(-10,-10,0));
    triGeometry.vertices.push(new THREE.Vector3(10,-10,0));

    triGeometry.faces.push(new THREE.Face3(0,1,2))

    // Vertex colors
    var vColors = [ new THREE.Color(0xFF0000), new THREE.Color(0x00FF00), new THREE.Color(0x0000FF)]
    var f = triGeometry.faces[0]
    f.vertexColors[0] = vColors[0];
    f.vertexColors[1] = vColors[1];
    f.vertexColors[2] = vColors[2];

    var triMaterial = new THREE.MeshBasicMaterial(
        {color: 0xFFFFFF, vertexColors:THREE.VertexColors}
    );

    var triangle = new THREE.Mesh(triGeometry,  triMaterial);

    var verts = [[10, 10, 0], [-10, 10, 0], [10, -10, 0], [-10, -10, 0]]

    var faces = [[0,1,2], [2,1,3] ]

    var squareGeometry = self.makeGeometry(verts, faces)
    
    var square = new THREE.Mesh(squareGeometry, new THREE.MeshBasicMaterial(
        {color: 0x8888FF}
    ));

    square.position.x = 25

    self.scene.add(triangle);
    self.scene.add(square);
}

window.Lesson03 = Lesson03;
