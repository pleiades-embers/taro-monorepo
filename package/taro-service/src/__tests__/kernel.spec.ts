import { Kernel } from "../index";

const APP_PATH = "/a/b/c";

describe("kernel", () => {
  let kernel;
  let options: any = {
    appPath: APP_PATH,
  };

  /**
   *
   */

  beforeAll(() => {
    kernel = new Kernel(options);
    console.log(kernel);
    kernel.init();
  });

  describe("init", () => {
    it("", () => {
      console.log("这里debugger 一下");
    });
  });
});
