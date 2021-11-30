import Kernel from '../Kernel';
import * as path from 'path';
describe('config', () => {
  describe('init', () => {
    const kernel = new Kernel({
      appPath: '',
      presets: [path.resolve(__dirname, './__mocks__', 'presets.ts')]
    });

    it('run', () => {
      kernel.run({
        name: 'init',
        opts: {
          appPath: '',
          projectName: 'temp'
        }
      });
    });
  });
});
