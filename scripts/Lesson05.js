var Lesson05 = (function() {
    var self = this;
    self.prototype = new App();
    window.app = self.prototype;
    self.drawScene();
    return self;
});

Lesson05.prototype.drawScene = function () {
    var self = this.prototype;

    pyGeometry = self.makeGeometry(
      [
        [0, 10, 0],
        [-10, -10, 10],
        [10, -10, 10],
        
        //[0, 10, 0]
        //[10, -10, 10]
        [10, -10, -10],
        
        //[0,10,0]
        //[10,-10,-10]
        [-10,-10,-10]
        
        //[0, 10, 0]
        //[-10, -10,-10]
        //[-10, -10, 10]
        
      ], [[0,1,2],[0,2,3],[0,3,4], [0,4,1]]
    )



    vColors = [
      new THREE.Color(0xFF0000),
      new THREE.Color(0x00FF00),
      new THREE.Color(0x0000FF)
    ];

    for (var i = 0; i < pyGeometry.faces.length; i++) {
	var f = pyGeometry.faces[i];
	f.vertexColors[0] = vColors[0]
	f.vertexColors[1] = vColors[1]
	f.vertexColors[2] = vColors[2]
    }      

    pyMaterial = new THREE.MeshBasicMaterial(
      {color: 0xFFFFFF, vertexColors:THREE.VertexColors}
    );

    
    self.pyramid = new THREE.Mesh(pyGeometry, pyMaterial)
    
    self.scene.add(self.pyramid)
}

// Override App's render class
App.prototype.render = function () {
    var self = this;
    self.pyramid.rotation.y += 0.1;

    self.renderer.render(self.scene, self.camera);            

};

window.Lesson05 = Lesson05;
