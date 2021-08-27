
const fs = require('fs')
test('测试测试代码文件生成', ()=> {
    fs.rmdirSync(__dirname + '/data/__test__', {
        recursive: true
    })

    const src = new (require('../index.js'))()
    src.genJestSource(__dirname + '/data')
})

// test('测试测试代码生成',()=> {
//     let file = new (require('../index'))()
//     let res = file.getTestSourcs('fun', 'class')
//     console.log(res)
//     expect(res)
//         .toBe(`test(Test fun, ()=> {
//             const false ? { fun } : fun = require('../class')
//             const ret = fun()
//             // expect(ret)
//             //    .tobe(test return)
//         })`)
// })


// test('测试生成文件名', ()=> {
//     // 1.导入文件
//     let src = require('../index')
//     // 2.执行函数
//     let file = new src()
//     let res = file.getTestFileName('/temp/class.js')
//     // 3.执行断言
//     expect(res)
//         .toBe('/temp/__test__/class.spec.js')
// })