var EnemyShip = (function() {
  this.bullets = [];
  this.geometry = new THREE.PlaneGeometry(100,50);
  this.texture = THREE.ImageUtils.loadTexture('images/shootorial/enemyShip.png');

  // transparent: true acknowledges that there is an alpha channel
  this.material = new THREE.MeshBasicMaterial({
      color:0xFFFFFF, map:this.texture, transparent: true, opacity: 1.0});
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position.x = 400;
  this.mesh.position.y = 300;
  this.mesh.position.z = 500;
  this.mesh.name = 'EnemyShip';

  return this;
});

EnemyShip.prototype.shoot = function() {

};

EnemyShip.prototype.getMesh = function() {
  return this.mesh;
};

var EnemyShipManager = (function() {
  this.clock = new THREE.Clock(true);
  this.enemies = [];
  this.spawnTime = 5;
  this.currentTime = 0;
  this.spawning = true;
  return this;
});

EnemyShipManager.prototype.trySpawn = function() {
  var self = this;
  self.currentTime += self.clock.getDelta();
  //console.log(this.currentTime);
  if (self.currentTime >= self.spawnTime && self.spawning) {
    self.spawn();
    self.currentTime = 0;
  }
};

EnemyShipManager.prototype.render = function () {
  var self = this;
  var enemies = self.getScene().children;
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    if (enemy.name == 'EnemyShip') {
      enemy.position.x -= 5;
    }
    // Remove ship when offscreen
    if (enemy.position.x < -600) {
      self.getScene().remove(enemy);
    }
  }
};

EnemyShipManager.prototype.spawn = function () {
  var enemy = new EnemyShip();
  this.enemies.push(enemy);
  this.getScene().add(enemy.getMesh());
};

EnemyShipManager.prototype.setSpawn = function(state) {
  var self = this;
  self.spawning = true;
  self.currentTime = 0;
};

EnemyShipManager.prototype.killShip = function(ship) {
  var self = this;
  self.enemies.remove(ship);
  self.getScene.remove(ship);
};

EnemyShipManager.prototype.getScene = function() {
  return window.app.scene;
};


window.EnemyShip = EnemyShip;