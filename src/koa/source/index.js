const KKB = require('./kkb')
const app = new KKB()

app.use(ctx=> {
    ctx.body = 'hello ctx'
})

app.listen(3300, ()=> {
    console.log("hppt://localhost:3300")
})