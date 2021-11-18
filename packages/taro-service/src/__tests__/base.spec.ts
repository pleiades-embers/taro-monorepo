import Kernel from "../Kernel"


describe('config', () => {
  let result
  const platform = 'weapp'
  const baseOpts={
    _:[
        'build'
    ],
    options:{
        platform:undefined,
        isWatch:false,
        env:undefined,
        blended:false,
    },
    isHelp:false
}
  const opts = Object.assign({}, baseOpts)
  opts.options = Object.assign({}, baseOpts.options, {
      platform,
      isWatch: true,
      port: 8080,
      deviceType: undefined,
      resetCache: false,
      qr: false
  })

  beforeAll(() => {
    // result = new Kernel();
    result.init();
  });

  describe('init', () => {
    it('', () => {});
  });
});
