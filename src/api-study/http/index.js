const http = require('http')
const fs = require('fs')
http.createServer((request, response)=> {
    const { url, method, headers }= request
    console.log(url)
    console.log(method)
    if(url === '/' && method === 'GET') {
        response.setHeader("Content-Type", 'text/html')
        fs.readFile('./index.html', (err, data)=> {
            console.log(err)
            if(err) {
                response.writeHead(500 , {
                    "Content-Type": 'text/plain;charset=utf-8'
                })

                response.end('500 系统错误')
            }
            response.end(data)
        })
    } else if(url === '/api/users' && method === 'GET') {
        response.setHeader("Content-Type", 'application/json')
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.end(JSON.stringify({
            name: '李四'
        }))
    } else if(url === '/api/users?callback=callback' && method === 'GET') {
        response.setHeader("Content-Type", 'application/json')
        response.end(`callback({
            name: '李四'
        })`)
    } else if(method === 'GET' && headers.accept.indexOf('image/*') > -1) {
        console.log('url',url)
        if(fs.existsSync('.'+url)) {
            let stream = fs.createReadStream('.' + url)
            stream.pipe(response)
        }
    } else {
        response.writeHead( 404, {
            "Content-Type": 'text/plain;charset=utf-8'
        })
        response.end('404 页面不存在')
    }
}).listen(4000, ()=> {
    console.log('http://localhost:9090')
})