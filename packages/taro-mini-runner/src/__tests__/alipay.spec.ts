import { compile } from './utils/compiler'

describe('Compiler', () => {
  test('should compile', async () => {
    const { stats } = await compile('react', {
      buildAdapter: 'alipay'
    })

    // const assets = stats.toJson().assets || []
    expect(stats).toMatchSnapshot()
  })
})
