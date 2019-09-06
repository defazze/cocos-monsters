cc.Class({
  extends: cc.Component,

  properties: {
    stonePrefab: {
      default: null,
      type: cc.Prefab
    },
    monsterPrefab: {
      default: null,
      type: cc.Prefab
    },
    player: {
      default: null,
      type: cc.Node
    },

    background1: {
      default: null,
      type: cc.Node
    },
    background2: {
      default: null,
      type: cc.Node
    }
  },

  onLoad() {
    this.allowMove = true;
    this.stones = [];
    this.player.on("onCollisionX", () => this.setAllowMove(false));
    this.player.on("onCollisionExit", () => this.setAllowMove(true));

    const collider = cc.director.getCollisionManager();
    collider.enabled = true;
    collider.enabledDebugDraw = true;
    collider.enabledDrawBoundingBox = true;

    cc.director.getPhysicsManager().enabled = true;
  },

  start() {},

  spawnStone: function(x, y) {
    var stone = cc.instantiate(this.stonePrefab);
    this.node.addChild(stone);
    stone.setPosition(cc.v2(x, y));
    this.stones.push(stone);
  },

  setAllowMove(move) {
    this.allowMove = move;

    this.stones.forEach(s => {
      s.getComponent("Stone").setAllowMove(move);
    });

    this.background1.getComponent("Background").setAllowMove(move);
    this.background2.getComponent("Background").setAllowMove(move);

    this.player.getComponent("Knight").setAllowMove(move);
  },

  update(dt) {
    if (this.allowMove) {
      const spawnChance = Math.random();

      if (spawnChance > 0.99) {
        const stoneX = Math.random() * 500 + 600;
        const stoneY = Math.random() * 600 - 300;

        this.spawnStone(stoneX, stoneY);
      }
    }
  }
});
