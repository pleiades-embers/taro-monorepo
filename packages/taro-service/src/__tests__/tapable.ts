import { AsyncSeriesWaterfallHook } from 'tapable';

let initialVal = {
  kernelApis: [
    'appPath',
    'plugins',
    'platforms',
    'paths',
    'helper',
    'runOpts',
    'initialConfig',
    'applyPlugins'
  ]
};

const waterfall = new AsyncSeriesWaterfallHook(['arg']);

waterfall.tapPromise(
  {
    name: 'appPath'
  },
  async (arg) => {
    console.log(arg);
    
  }
);

console.log(waterfall.promise(initialVal),1111111);
