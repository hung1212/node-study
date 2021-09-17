const KKB = require('./kkb')
const Router = require('./router')
const app = new KKB()
const router = new Router()

// app.use(async (ctx,next) => {
//     ctx.body = '1'
//     await next()
//     ctx.body += '4'
// })

// app.use(async (ctx)=> {
//     ctx.body += '2'
//     await delay()
//     ctx.body += '3'
// })

// function delay() {
//     return new Promise((reslove, reject)=> {
//         setTimeout(()=> {
//             reslove('reslove')
//         }, 3000)
//     })
// }

router.get('/index', async (ctx)=> {
    ctx.body = 'index'
})

router.get('/', async (ctx)=> {
    ctx.body = '/'
})
router.get('/home', async (ctx)=> ctx.body = 'home')
router.get('/jest',  async(ctx)=> ctx.body = 'jest')

app.use(async(ctx, next)=> {
    await next()
})

app.use(router.routes())

app.listen(3300, ()=> {
    console.log("hppt://localhost:3300")
})