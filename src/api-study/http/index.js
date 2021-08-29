const http = require('http')
const fs = require('fs')
http.createServer((request, response)=> {
    const { url, method, headers }= request
    console.log(headers)
    if(url === '/' && method === 'GET') {
        response.setHeader("Content-Type", 'text/html')
        fs.readFile('./index.html', (err, data)=> {
            if(err) {
                response.writeHead(500 , {
                    "Content-Type": 'text/plain;charset=utf-8'
                })

                response.end('500 系统错误')
            }
            response.end(data)
        })
    } else if(url === '/user' && method === 'GET') {
        response.setHeader("Content-Type", 'application/json')
        response.end(JSON.stringify({
            name: '李四'
        }))
    } else if(method === 'GET' && headers.accept.indexOf('image/*') > -1) {
        console.log('url',url)
       let stream = fs.createReadStream('.' + url)
        stream.pipe(response)
    } else {
        response.writeHead( 404, {
            "Content-Type": 'text/plain;charset=utf-8'
        })
        response.end('404 页面不存在')
    }
}).listen(9090)