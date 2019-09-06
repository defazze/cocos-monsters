cc.Class({
  extends: cc.Component,

  properties: {
    deltaSpeed: 10
  },

  getBody() {
    return this.getComponent(cc.RigidBody);
  },

  onKeyDown(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.w:
        this.speed = this.deltaSpeed;
        break;
      case cc.macro.KEY.s:
        this.speed = -this.deltaSpeed;
        break;
    }
  },

  onKeyUp(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.w:
      case cc.macro.KEY.s:
        this.speed = 0;
        break;
    }
  },

  onLoad: function() {
    this.speed = 0;
    this.blocks = [];
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },

  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },

  onCollisionEnter: function(other, self) {
    const selfAabb = self.world.aabb;
    const selfPreAabb = self.world.preAabb;
    const otherAabb = other.world.aabb;
    const otherPreAabb = other.world.preAabb;

    selfPreAabb.y = selfAabb.y;
    otherPreAabb.y = otherAabb.y;

    if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
      if (this.speed > 0) {
        this.node.y =
          otherPreAabb.yMin - this.node.parent.y - this.node.height / 2 - 1;
      } else if (this.speed < 0) {
        this.node.y =
          otherPreAabb.yMax - this.node.parent.y + this.node.height / 2 + 1;
      }

      this.speed = 0;
      this.collision = true;

      return;
    }

    selfPreAabb.x = selfAabb.x;
    otherPreAabb.x = otherAabb.x;

    if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
      this.blocks.push(other);
      this.node.emit("onCollisionX");
      return;
    }
  },

  onCollisionStay: function(other, self) {},

  onCollisionExit: function(other) {
    this.collision = false;
    this.blocks = this.blocks.filter(b => b != other);

    if (this.blocks.length == 0) {
      this.node.emit("onCollisionExit");
    }
  },

  start() {},

  setAllowMove(move) {
    const animation = this.getComponent(cc.Animation);
    animation.play(move ? "knight_walk" : "knight_idle");
  },

  update(dt) {
    if (!this.collision) {
      this.node.y += this.speed * dt;
    }
  }
});
