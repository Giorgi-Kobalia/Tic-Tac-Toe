import { Container, Sprite } from "pixi.js";
import { AssetsManager } from "../managers/assets.manager";

export class Background extends Container {
  constructor() {
    super();
    window.addEventListener("resize", () => this.changeSize());
  }

  private sprite: Sprite = new Sprite();

  init(container: Container) {
    const { texture } = AssetsManager.getInstance().get("background");
    this.sprite = new Sprite(texture);
    this.sprite.width = window.innerWidth;
    this.sprite.height = window.innerHeight;
    this.addChild(this.sprite);
    container.addChild(this);
  }

  changeSize() {
    this.sprite.width = window.innerWidth;
    this.sprite.height = window.innerHeight;
  }
}
