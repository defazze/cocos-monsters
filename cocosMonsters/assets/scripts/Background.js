cc.Class({
  extends: cc.Component,

  properties: {
    speed: 0,
    bgWidth: 0
  },

  onLoad: function() {},

  update: function(dt) {
    var x = this.node.x;
    x -= this.speed * dt;
    if (x <= -this.bgWidth) {
      x += this.bgWidth * 2;
    }
    this.node.x = x;
  }
});
