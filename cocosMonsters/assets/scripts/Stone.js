cc.Class({
  extends: cc.Component,

  properties: {
    speed: 10
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.allowMove = true;
  },

  start() {},

  setAllowMove(move) {
    this.allowMove = move;
  },

  update(dt) {
    if (this.allowMove) {
      this.node.x -= this.speed * dt;
    }
  }
});
