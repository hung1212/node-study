const koa = require('koa')
const app = new koa

app.use( async (ctx, next)=> {
    ctx.body = {
        name: '张三'
    }

    let start = Date.now()
    await next()
    let end = Date.now()
    console.log(`请求${ctx.url},花费了${end - start}毫秒`)
})

app.use( async (ctx)=> {
    let sun = 0
    for(let i=0; i< 1000000; i++){ sun += i}
    const routers = []
    routers['/html'] = ()=> {
        ctx.type = 'text/html;charset=utf-8;'
        ctx.body = `<p style="color: red">我的名字叫${ctx.body.name},今年${sun}岁</p>`
    }
    let fun  = routers['/html']       
    fun && fun()
    
})
app.listen(3000, ()=> {
    console.log('http://localhost:3000') 
})