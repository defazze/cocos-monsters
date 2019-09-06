cc.Class({
  extends: cc.Component,

  properties: {
    totalHealth: 100
  },

  setSprite(assetName) {
    const sprite = this.spriteNode.getComponent(cc.Sprite);

    const url = "sprites/monsters/" + assetName;
    cc.loader.loadRes(url, cc.SpriteFrame, (err, spriteFrame) => {
      if (err) {
        console.log(err);
      }
      sprite.spriteFrame = spriteFrame;
    });
  },

  onLoad: function() {
    this.health = this.totalHealth;

    this.spriteNode = this.node.getChildByName("Sprite");
    this.healthBarNode = this.node.getChildByName("HealthBar");
    this.healthBar = this.healthBarNode.getComponent("HealthBar");
    this.healthBar.init(this.health, this.health);

    this.spriteNode.on("mousedown", () => {
      this.health -= 10;
      this.healthBar.setHealth(this.health);

      if (this.health <= 0) {
        this.node.destroy();
      }
    });

    this.setSprite("mushroom");
  },

  start() {}

  // update (dt) {},
});
