import {App} from '../../sample/src/app'

describe('demo app', () => {
  it('says hello', () => {
    expect(new App().message).toBe('Hello World, Aurelia Media Manager!');
  })
})
