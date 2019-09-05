// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    deltaSpeed: 10
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
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

  // LIFE-CYCLE CALLBACKS:

  onLoad: function() {
    this.speed = 0;

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },

  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },

  onCollisionEnter: function(other, self) {
    console.log("on collision enter");
    //console.log("knight aabb:", self.world.aabb);
    //console.log("knight preAabb:", self.world.preAabb);

    //console.log("roof aabb:", other.world.aabb);
    //console.log("roof preAabb:", other.world.preAabb);

    //console.log("node y", this.node.y);
    //console.log("node parent y", this.node.parent.y);

    //console.log("parent node", this.node.parent);

    this.node.y =
      other.world.preAabb.yMin - this.node.parent.y - this.node.height / 2 - 1;
    this.speed = 0;
    this.collision = true;
    //this.getBody().linearVelocity = cc.v2(0, 0);
  },

  onCollisionStay: function(other, self) {
    console.log("on collision stay");
    //this.getBody().linearVelocity = cc.v2(0, 0);
  },
  onCollisionExit: function(other) {
    this.collision = false;
    console.log("on collision exit");
  },
  start() {},

  update(dt) {
    if (!this.collision) {
      this.node.y += this.speed * dt;
    }
  }
});
