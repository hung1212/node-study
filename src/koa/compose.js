const add = (x, y)=> x + y
const square = (y) => y * y 

// console.log(square(add(1,2)))

// 合并成一个函数
// const compose = (f1, f2) =>(...arg) => f2(f1(...arg))
// const fn = compose(add, square)
// console.log(fn(2,2))

// 函数数量不固定
// const compose = function(first, ...later) {
//     return function(...arg) {
//         let r = first(...arg)
//         later.forEach(fn=> {
//             r = fn(r)
//         })
//         return r
//     }
// }
// let fn = compose(add, square, square)
// console.log(fn(2,2))

// 异步中间件 需要支持异步函数
async function fn1(next) {
    console.log('start f1')
    await next()
    console.log('end f1')
}

async function fn2(next) {
    console.log('start f2')
    await delay()
    await next()
    console.log('end f2')
}

async function fn3() {
    console.log('start f3')
}

function delay() {
    return new Promise((reslove, reject)=> {
        setTimeout(()=> {
            reslove('reslove')
        }, 3000)
    })
}

const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn()

// 重点 难点
function compose(middlewares) {
    return function() {
        return dispatch(0)
        function dispatch(i) {
            let fn = middlewares[i]
            if(!fn) return Promise.resolve()
            return Promise.resolve(
                fn(()=> {
                   return dispatch(i + 1)
                })
            )
        }
    }
}

