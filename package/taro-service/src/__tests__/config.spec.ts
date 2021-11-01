import Config  from "../config";

const APP_PATH = "/a/b/c";

describe("config", () => {
  let config;
  let options: any = {
    appPath: APP_PATH,
  };

  /**
   * 
   */

  beforeAll(() => {
    config = new Config(options);
    console.log(config);
    config.init();
  });

  describe("init", () => {
      it('',()=>{
        console.log("这里debugger 一下")
      })
  });
});
