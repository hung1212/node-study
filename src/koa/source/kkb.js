const http = require('http')
const context = require('./context')
const response = require('./response')
const request = require('./request')
class KKB {
    listen(...arg) {
        const serve = http.createServer((req, res)=> {
            // this.callBack(req, res)
            let ctx = createContext(req, res)

            this.callBack(ctx)
            console.log(ctx.body)
            res.end(ctx.body)
        })
        serve.listen(...arg)
    }
    use(callBack) {
        this.callBack = callBack
    }
}

function createContext(req, res) {
    const ctx = Object.create(context)
    ctx.response = Object.create(response)
    ctx.request = Object.create(request)

    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res

    return ctx
}

module.exports = KKB