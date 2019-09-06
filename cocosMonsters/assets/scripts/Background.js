cc.Class({
  extends: cc.Component,

  properties: {
    speed: 0,
    bgWidth: 0
  },

  onLoad: function() {
    this.allowMove = true;
  },

  setAllowMove(move) {
    this.allowMove = move;
  },

  update: function(dt) {
    if (this.allowMove) {
      var x = this.node.x;
      x -= this.speed * dt;
      if (x <= -this.bgWidth) {
        x += this.bgWidth * 2;
      }
      this.node.x = x;
    }
  }
});
