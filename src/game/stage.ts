import { Container } from "pixi.js";
import { manifest } from "./constants/manifest.constant";
import { Background } from "./ui/background";
import { Playfield } from "./ui/playfield";
import { GameController } from "../game/classes/game-controller.clas";
import { AssetsManager } from "./managers/assets.manager";

export class TicTacToeStage extends Container {
  private bg = new Background();
  private playfield = new Playfield();
  private game = new GameController();
  private assetsManager = AssetsManager.getInstance();

  constructor() {
    super();
    this.assetsManager.addBundle(manifest).loadBundle(() => {
      this.init();
    });
  }

  init() {
    this.bg.init(this);
    this.playfield.init(this).center().addChild(this.game);
    this.game.init();
  }
}
