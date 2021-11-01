import {Kernel} from "../index";

const APP_PATH = "/a/b/c";

describe("inspect", () => {
  let kernel;
  let options: any = {
    appPath: APP_PATH,
  };
  beforeAll(() => {
    kernel = new Kernel(options);
    console.log(kernel);
    kernel.init();
  });

  describe("build", () => {
      it('should make configs',()=>{

      })
  });
});
