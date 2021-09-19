const path = require('path')
const fs = require('fs');
module.exports = function( dirPath = "./public" ) {
    return (ctx, next)=> {
        const url = path.resolve(__dirname, dirPath);
        const fileBaseName = path.basename(url)
        const fileName = url + ctx.url.replace("/public", "")
        try {
            const start = fs.statSync(fileName)
            if(start.isDirectory()) {
                const dir = fs.readdirSync(fileName)
                let ret = []
                dir.forEach(v=> {
                    let path = `${fileName}/${v}`
                    // 目录
                    if(fs.statSync(path).isDirectory) {
                        ret.push(`<a style='display:block' href='${ctx.url}/${v}'>${v}</a>`)
                    } else {
                        ret.push(`<a style='display:block' href='${ctx.url}/${v}'>${v}</a>`)
                    }
                })
                ctx.body = ret.join('')
            } else {
                const context = fs.readFileSync(fileName)
                ctx.body = context.toString()
            }
        } catch(e) {
            console.log(e)
            ctx.body = '404 not found'
        }
    }
}