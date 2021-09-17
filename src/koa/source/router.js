module.exports = class Router {
    constructor() {
        this.stack = []
    }

    register(obj) {
        this.stack.push(obj)
    }

    get(path, middleware) {
        this.register({path, middleware, method: 'get'})
    }

    post(path, middleware) {
        this.register({path, middleware, method: 'post'})
    }

    routes() {
        return async (ctx)=> {
            const { url, method } = ctx
            for(let i=0; i < this.stack.length; i++) {
                let t = this.stack[i]
                if(t.path === url && method === t.method) {
                    t.middleware(ctx)
                    break
                }
            }
        }
    }

}