const http = require('http')
const context = require('./context')
const response = require('./response')
const request = require('./request')
const { version } = require('os')
class KKB {
    constructor() {
        this.middlewares = []
    }
    listen(...arg) {
        const serve = http.createServer( async (req, res)=> {
            // this.callBack(req, res)
            let ctx = createContext(req, res)
            
            let fn = compose(this.middlewares)
            console.log(fn(ctx))
            await fn(ctx)
            res.end(ctx.body)
        })
        serve.listen(...arg)
    }
    use(middleware) {
        console.log(middleware)
        this.middlewares.push(middleware)
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

function compose(middlewares) {
    return function(ctx) {
        return dispatch(0)
        function dispatch(i) {
            let fn = middlewares[i]
            if(!fn) return Promise.resolve()
            return Promise.resolve(
                fn(ctx, function next() {
                    return dispatch(i + 1)
                })
            )
        }
    }
}

module.exports = KKB