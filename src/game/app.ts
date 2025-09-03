import { Application, DisplayObject } from "pixi.js";

export class App {
  private _app: Application;

  constructor(element: HTMLElement | null, stage: DisplayObject) {
    if (!element) throw new Error("element is missing");
    this._app = new Application({
      resizeTo: window,
      backgroundColor: 0x0f1220,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio, 2),
    });

    (globalThis as any).__PIXI_APP__ = this._app;
    element.appendChild(this._app.view);
    this._app.stage.addChild(stage);

    window.addEventListener("resize", () => {
      this._app.renderer.resize(window.innerWidth, window.innerHeight);
    });
  }

  get app() {
    return this._app;
  }
}
