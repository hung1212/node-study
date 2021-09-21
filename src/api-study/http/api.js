const koa = require('koa')
const app = new koa
const proxy = require('koa-cache-proxy')

const static = require('koa-static')

app.use(static(__dirname+'/'))
app.use(proxy({ match: '/api', host: 'http://localhost:4000' }));
app.listen(3000)