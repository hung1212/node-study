let path = require('path')

module.exports = class CreateTestFile {

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