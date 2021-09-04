const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const open = require("open")
const clear = require('clear')
const chalk = require('chalk')
const { clone } = require('./download')
const log = content => console.log(chalk.green(content))
// promisiy化spawn
// 对接输出流
const spawn = async (...args) => {
    const { spawn } = require('child_process');
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}

module.exports = async name => {
    // 打印欢迎画面
    clear()
    const data = await figlet('s t a t s')
    log(data)
    console.log('🚀创建项目:' + name)
    // await clone('github:su37josephxia/vue-template', name)
    log('安装依赖')
    // await spawn('npm', ['install'], { cwd: `./${name}` })
    log(chalk.green(`
        👌安装完成：
        To get Start:
        ===========================
        cd ${name}
        npm run serve
        ===========================`)
    )

    open(`http://localhost:8081`);
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}