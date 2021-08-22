
test('测试index.js',()=> {
    const helloText = require('../index')
    expect(helloText).toBe('hello world')
})  