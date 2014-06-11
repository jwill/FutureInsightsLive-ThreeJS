var App = (function() {
    var self = this;
    var height = 480;
    var width = 640;
          
    var fov = 45;
    var aspect = width / height;
    var near = 0.1;
    var far = 10000;

    self.renderer = new THREE.WebGLRenderer({autoClear:true});
    self.renderer.setClearColor(new THREE.Color(0x000000));
    self.renderer.setSize(width, height);

    self.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    self.camera.position.z = 100;

    self.scene = new THREE.Scene();

    var container = document.querySelector('#container')

    if (container.hasChildNodes())
        container.replaceChild(self.renderer.domElement);
    else container.appendChild(self.renderer.domElement);

    self.scene.add(self.camera);
});


App.prototype.render = function() {
    var self = this;
    self.renderer.render(self.scene, self.camera);            
};

App.prototype.makeGeometry = function (verts, faces) {
    console.log("here");
    var g = new THREE.Geometry();
    for (var i = 0; i<verts.length; i++) {
        var v = verts[i];
        g.vertices.push(new THREE.Vector3(v[0], v[1], v[2]));
    }
    for (var j = 0; j<faces.length; j++) {
        var f = faces[j];
        g.faces.push(new THREE.Face3(f[0], f[1], f[2]));
    }
    return g;
}

window.animate = function () {
    requestAnimationFrame(window.animate);
    window.app.render();
}

window.App = App
