import { partial } from 'lodash'
import { getCopyWebpackPlugin } from '../webpack/chain'
describe('partial', () => {
  test('should partial', async () => {
    const greet = function (greeting, name) {
      return greeting + ' ' + name
    }

    const sayHelloTo = partial(greet, 'hello')

    // 使用了占位符。
    const greetFred = partial(greet, 'fred')

    expect(sayHelloTo('fred')).toMatchInlineSnapshot(`"hello fred"`)
    expect(greetFred('hi')).toMatchInlineSnapshot(`"fred hi"`)
    const copy = {}
    expect(getCopyWebpackPlugin({ copy, appPath: 'react' })).toMatchInlineSnapshot()
  })
})
