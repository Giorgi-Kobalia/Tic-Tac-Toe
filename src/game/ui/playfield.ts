import { Container, Sprite } from "pixi.js";
import { AssetsManager } from "../managers/assets.manager";

export class Playfield extends Container {
  private SIZE = 640;

  constructor() {
    super();
    window.addEventListener("resize", () => this.center());
  }

  init(container: Container) {
    const { texture } = AssetsManager.getInstance().get("playfield");
    const sprite = new Sprite(texture);
    this.addChild(sprite);
    container.addChild(this);
    return this;
  }

  center() {
    const CANVAS_WIDTH = window.innerWidth;
    const CANVAS_HEIGHT = window.innerHeight;

    this.pivot.set(this.SIZE / 2);
    this.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    return this;
  }
}
