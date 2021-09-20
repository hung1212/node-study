const koa = require('koa')
const app = new koa

const static = require('koa-static')

app.use(static(__dirname+'/'))

app.listen(3000)