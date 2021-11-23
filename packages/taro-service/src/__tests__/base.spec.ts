import Kernel from '../Kernel';
import * as path from "path"
describe('config', () => {
  const platform = 'weapp';
  const baseOpts = {
    _: ['build'],
    options: {
      platform: undefined,
      isWatch: false,
      env: undefined,
      blended: false
    },
    isHelp: false
  };
  const opts = Object.assign({}, baseOpts);
  opts.options = Object.assign({}, baseOpts.options, {
    platform,
    isWatch: true,
    port: 8080,
    deviceType: undefined,
    resetCache: false,
    qr: false
  });
  describe('init', () => {
    const result = new Kernel({
      appPath: '',
      presets: [path.resolve(__dirname, '.', 'presets', 'index.js')]
    });
    console.log(result);
    
    it("should",()=>{
      
    })
  });
});
