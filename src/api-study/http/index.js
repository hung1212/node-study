const http = require('http')
const fs = require('fs')
http.createServer((request, respose)=> {
    const { url, method, headers }= request
    console.log(url)
    console.log(method)
    if(url === '/' && method === 'GET') {
        respose.setHeader("Content-Type", 'text/html')
        fs.readFile('./index.html', (err, data)=> {
            console.log(err)
            if(err) {
                respose.writeHead(500 , {
                    "Content-Type": 'text/plain;charset=utf-8'
                })

                respose.end('500 系统错误')
            }
            respose.end(data)
        })
    } else if(url === '/api/users' && method === 'OPTIONS') {
        respose.writeHead(200, {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': 'X-token, Content-Type',
            'Access-Control-Allow-Credentials': true
        })
        respose.end()
    } else if((url === '/api/users') && ( method === 'GET' || method === 'POST' )) {
        respose.setHeader("Content-Type", 'application/json')
        respose.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        respose.setHeader('Set-Cookie', 'Cookiel=val123')
        respose.setHeader('Access-control-Allow-Credentials', true)
        respose.end(JSON.stringify({
            name: '李四'
        }))
    } else if(url === '/api/users?callback=callback' && method === 'GET') {
        respose.setHeader("Content-Type", 'application/json')
        respose.end(`callback({
            name: '李四'
        })`)
    } else if(method === 'GET' && headers.accept.indexOf('image/*') > -1) {
        console.log('url',url)
        if(fs.existsSync('.'+url)) {
            let stream = fs.createReadStream('.' + url)
            stream.pipe(respose)
        }
    } else {
        respose.writeHead( 404, {
            "Content-Type": 'text/plain;charset=utf-8'
        })
        respose.end('404 页面不存在')
    }
}).listen(4000, ()=> {
    console.log('http://localhost:4000')
})