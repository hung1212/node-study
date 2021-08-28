module.exports = function promisify(fn) {
    return (...arg)=> {
        return new Promise((resolve, reject)=> {
            arg.push(function(err, data) {
                if(err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
            fn.apply(null, arg)
        })
    } 
}