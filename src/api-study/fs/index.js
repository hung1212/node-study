
const fs = require('fs')

// 同步
// let file = fs.readFileSync('./config.js')
// console.log(file.toString())

// callBack
// fs.readFile('./config.js', (err, data)=> {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// })

// 改造promise
// const { promisify } =  require('util')
const promisify = require('../promise/promisify')
const readFile = promisify(fs.readFile)
readFile('./config.js').then((data)=> {
    console.log(data)
})