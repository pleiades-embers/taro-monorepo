import Kernel from '../Kernel';
import * as path from 'path';
describe('config', () => {
  describe('init', () => {
    const kernel = new Kernel({
      appPath: '',
      presets: [path.resolve(__dirname, '.', 'presets', 'index.js')]
    });

    it('run', () => {
      kernel.run({
        command: 'init',
        opts: {
          appPath:"",
          projectName: 'temp',
        }
      });
    });
  });
});
