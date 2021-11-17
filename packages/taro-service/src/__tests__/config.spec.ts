import Config from '../Config';

const APP_PATH = './';

describe('config', () => {
  let config;
  let options: any = {
    appPath: APP_PATH
  };

  beforeAll(() => {
    config = new Config(options);
    config.init();
  });

  describe('init', () => {
    it('', () => {});
  });
});
