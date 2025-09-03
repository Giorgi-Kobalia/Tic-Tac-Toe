import { Container, BitmapText } from "pixi.js";
import { Winner } from "../enums/winner.enum";

export class WinnersText extends Container {
  private textObj?: BitmapText;

  constructor() {
    super();
  }

  init(container: Container) {
    this.textObj = new BitmapText("", {
      fontName: "darkFont",
      fontSize: 48,
      tint: 0xffffff,
    });

    this.textObj.anchor.set(0.5);
    this.addChild(this.textObj);

    this.position.set(320, -100);
    this.visible = false;

    container.addChild(this);
  }

  updateText(winner: Winner) {
    if (!this.textObj) return;
    switch (winner) {
      case Winner.Cross:
        this.textObj.text = "Crosses Win!";
        this.textObj.fontName = "darkFont";
        break;
      case Winner.Circle:
        this.textObj.text = "Circles Win!";
        this.textObj.fontName = "lightFont";
        break;
      case Winner.Draw:
        this.textObj.text = "It's a Draw!";
        this.textObj.fontName = "darkFont";
        break;
      default:
        this.textObj.text = "";
        this.visible = false;
        return;
    } 

    this.visible = true;
  }
}
