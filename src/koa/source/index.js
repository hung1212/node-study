const KKB = require('./kkb')
const app = new KKB()

app.use(async (ctx,next) => {
    ctx.body = '1'
    await next()
    ctx.body += '4'
})

app.use(async (ctx)=> {
    ctx.body += '2'
    await delay()
    ctx.body += '3'
})

function delay() {
    return new Promise((reslove, reject)=> {
        setTimeout(()=> {
            reslove('reslove')
        }, 3000)
    })
}

app.listen(3300, ()=> {
    console.log("hppt://localhost:3300")
})