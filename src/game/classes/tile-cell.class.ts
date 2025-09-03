import { Container, Graphics, Sprite } from "pixi.js";
import { Spine } from "@pixi-spine/all-3.8";
import { Turn } from "../enums/turn.enum";
import { SymbolKey } from "../enums/symbol.enum";
import { AssetsManager } from "../managers/assets.manager";

export class TileCell extends Container {
  public static readonly TILE_SIZE = 200;
  public static readonly SPINE_SIZE = 120;

  index: number;
  private assetsManager = AssetsManager.getInstance();

  constructor(index: number) {
    super();
    this.index = index;

    const gfx = new Graphics()
      .beginFill(0xffffff)
      .drawRect(0, 0, TileCell.TILE_SIZE, TileCell.TILE_SIZE)
      .endFill();
    gfx.alpha = 0;

    this.addChild(gfx);

    this.interactive = true;
    this.cursor = "pointer";

    this.width = TileCell.TILE_SIZE;
    this.height = TileCell.TILE_SIZE;
  }

  setSymbol(turn: Turn) {
    const key = turn === Turn.Me ? SymbolKey.Cross : SymbolKey.Circle;
    const resource = this.assetsManager.get(key);
    const spine = new Spine(resource.spineData);
    spine.name = "spine";

    spine.width = TileCell.SPINE_SIZE;
    spine.height = TileCell.SPINE_SIZE;
    spine.position.set(TileCell.TILE_SIZE / 2, TileCell.TILE_SIZE / 2);

    spine.state.setAnimation(0, "draw", false);
    spine.state.timeScale = 1;

    this.addChild(spine);
  }

  highlight() {
    const highlight = Sprite.from("highlight");
    highlight.name = "highlight";
    highlight.width = TileCell.TILE_SIZE;
    highlight.height = TileCell.TILE_SIZE;

    this.addChildAt(highlight, 0);
  }

  animateWin() {
    const spine = this.getChildByName("spine") as Spine;
    if (spine) {
      spine.state.setAnimation(0, "win", true);
      spine.state.timeScale = 1.5;
    }  
  }

  clear() {
    const spine = this.getChildByName("spine");
    const highlight = this.getChildByName("highlight");

    if (spine) this.removeChild(spine);
    if (highlight) this.removeChild(highlight);
  }
}
