let path = require('path')
const fs = require('fs')
module.exports = class CreateTestFile {

    /**
     * 
     * @param {*} fileSource 要生成test的文件目录
     */
    genJestSource(sourcePath) {
       let rSourcePath = sourcePath + '/__test__' 
       if(!fs.existsSync(rSourcePath)) {
            fs.mkdirSync(rSourcePath)
       }
        
       let list = fs.readdirSync(sourcePath)
       // 1.添加完整路径
       list.map(v => `${sourcePath}/${v}`)
       // 2.过滤文件
       .filter(v => fs.statSync(v).isFile())
       // 3.去掉test文件
       .filter(v => v.indexOf('.spec' === -1))
       // 4.遍历生成test文件
       .map(v=> this.genJestFile(v))
    }

    genJestFile(sourcePath) {
        let testPath = this.getTestFileName(sourcePath)
        if(fs.existsSync(testPath)) {
            console.log('测试文件已存在')
            return
        }
        let mod = require(sourcePath)
        let source
        if(typeof mod === 'object') {
           source =  Object.keys(mod).map(v=> this.getTestSourcs(v, path.basename(sourcePath), true)).join('\n')
        } else if(typeof mod === 'function') {
           let basename = path.basename(sourcePath)
           source =  this.getTestSourcs(basename.replace('.js', ''), path.basename(sourcePath))
        }
        fs.writeFileSync(testPath, source)
    }

    getTestSourcs(methodName, classFile, isClass = false) {
        return `test('Test ${methodName}', ()=> {
            const ${isClass ? '{' + methodName + '}'  : methodName}  = require('../${classFile}')
            const ret = ${methodName}()
            // expect(ret)
            //    .tobe(test return)
        })`
    }

    /**
     * 生成测试文件名
     * @param {*} fileName 代码文件名
     */
    getTestFileName(fileName) {
        // fileName： /temp/class.js to /temp/__test__/class.spec.js
        let dirname = path.dirname(fileName) // /temp
        let extname = path.extname(fileName) // .js
        let basename = path.basename(fileName, extname) // class

        return path.format({
            dir: `${dirname}/__test__`,
            name: `${basename}.spec`,
            ext: extname
        })
    }
}
