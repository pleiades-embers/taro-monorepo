import Config from "../Config";

const APP_PATH = "/a/b/c";

describe("config", () => {
  let config;
  let options: any = {
    appPath: APP_PATH,
  };

  beforeAll(() => {
    config = new Config(options);
    config.init();
  });

  describe("init", () => {
    it("", () => {
      console.log("这里debugger 一下");
    });
  });
});
