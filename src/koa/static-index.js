const Koa = require('./source/kkb')
const app = new Koa

const static = require('./static')

app.use(static(__dirname+'/public'))

app.listen(5001, ()=> {
    console.log('http://localhost:5001')
})