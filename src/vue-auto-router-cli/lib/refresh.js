const fs = require('fs')
const handlebars = require('handlebars') 
const chalk = require('chalk')
module.exports = async ()=> {
    const list = fs.readdirSync('./src/views')
                .filter(v => v !== 'Home.vue')
                .map(v => ({
                    name: v.replace('.vue', '').toLowerCase(),
                    file: v
                }))
    compile({list}, './src/router.js', './template/router.js.hbs')
    compile({list}, './src/App.vue', './template/App.vue.hbs')
}

/**
 * 
 * @param {*} meta 数据
 * @param {*} filePath 生成的文件目标位置
 * @param {*} templateFilePath 模版文件位置
 */
function compile(meta, filePath, templateFilePath ) {
    if(fs.existsSync(templateFilePath)) {
        const component = fs.readFileSync(templateFilePath).toString()
        const resule = handlebars.compile(component)(meta)
        console.log(meta)
        fs.writeFileSync(filePath, resule)
    }
    console.log(chalk.green(`🚀${filePath} 创建成功`))
}