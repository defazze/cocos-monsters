cc.Class({
  extends: cc.Component,

  properties: {
    width: 80,
    height: 6,
    border: 2,
    borderColor: {
      default: new cc.Color()
    },
    progressColor: {
      default: new cc.Color()
    },
    emptyColor: {
      default: new cc.Color()
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.graphics = this.node.addComponent(cc.Graphics);
  },

  init(health, totalHealth) {
    this.totalHealth = totalHealth;
    this.health = health;
  },

  drawRect(x, y, width, height, color) {
    const { graphics } = this;

    graphics.fillColor = color;
    graphics.rect(
      x - this.node.width / 2,
      y - this.node.height / 2,
      width,
      height
    );
    graphics.fill();
  },

  drawBorderRect() {
    const { border, width, height } = this;

    this.drawRect(
      0,
      0,
      width + 2 * border,
      height + 2 * border,
      this.borderColor
    );

    this.drawRect(border, border, width, height, this.emptyColor);
  },

  setHealth(health) {
    this.health = Math.max(0, health);
  },

  start() {},

  update(dt) {
    const { border, width, height, totalHealth } = this;

    this.graphics.clear();
    this.health = Math.min(this.health || totalHealth, totalHealth);

    this.drawBorderRect();

    const healthLenght = (width / totalHealth) * this.health;
    this.drawRect(border, border, healthLenght, height, this.progressColor);
  }
});
