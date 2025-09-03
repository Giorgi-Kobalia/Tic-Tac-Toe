import { IAddOptions, Loader } from "pixi.js";

interface IAddBundle {
  name: string;
  srcs: string;
  data?: IAddOptions;
}

export class AssetsManager {
  private static instance: AssetsManager;
  private resources = new Map();

  static getInstance(): AssetsManager {
    if (!AssetsManager.instance) {
      AssetsManager.instance = new AssetsManager();
    }
    return AssetsManager.instance;
  }

  addBundle(manifest: IAddBundle[]) {
    manifest.forEach((item) => {
      Loader.shared.add(item.name, item.srcs, { ...item?.data });
    });
    return this;
  }

  async loadBundle(cb: () => void) {
    return await Loader.shared.load((res) => {
      const resources = res.resources;
      const resourceKeys = Object.keys(resources);
      resourceKeys.forEach((resource) => {
        this.resources.set(resource, resources[resource]);
      });
      cb && cb();
    });
  }

  get(name: string) {
    return this.resources.get(name);
  }
}
