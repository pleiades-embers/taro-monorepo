const { createDebug } = require('@tarojs/helper');

describe('debug', () => {
  const a = createDebug('worker:a');
  const b = createDebug('worker:b');

  describe('init', () => {
    function work() {
      a('doing lots of uninteresting work');
    }

    function workb() {
      b('doing some work');
    }

    it('run', () => {
      work();
      workb();
    });
  });
});
