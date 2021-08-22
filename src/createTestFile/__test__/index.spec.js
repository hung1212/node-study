

test('测试生成文件名', ()=> {
    // 1.导入文件
    let src = require('../index')
    // 2.执行函数
    let file = new src()
    let res = file.getTestFileName('/temp/class.js')
    // 3.执行断言
    expect(res)
        .toBe('/temp/__test__/class.spec.js')
})