const http = require('http')
const fs = require('fs')
http.createServer((request, respose)=> {
    const { url, method, headers }= request
    console.log(method)
    console.log(url)
    respose.setHeader("Content-Type", 'application/json')
    respose.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    respose.setHeader('Set-Cookie', 'Cookiel=val123')
    respose.setHeader('Access-control-Allow-Credentials', true)
    if(url === '/' && method === 'GET') {
        respose.setHeader("Content-Type", 'text/html')
        fs.readFile(`${__dirname}/index.html`, (err, data)=> {
            if(err) {
                respose.writeHead(500 , {
                    "Content-Type": 'text/plain;charset=utf-8'
                })

                respose.end('500 系统错误')
            }
            respose.end(data)
        })
    } else if(method === 'OPTIONS') {
        respose.writeHead(200, {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': 'X-token, Content-Type',
            'Access-Control-Allow-Credentials': true
        })
        respose.end()
    } else if((url === '/api/users') && ( method === 'GET' || method === 'POST' )) {
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
    } else if(method === 'POST' && url === '/api/save') {
        let reqData = [];
        let size = 0;
        request.on('data', data => {
            console.log('>>>req on', data);
            reqData.push(data);
            size += data.length;
        });
        request.on('end', function () {
            console.log('end')
            const data = Buffer.concat(reqData, size);
            console.log(data);
            console.log('data:', size, data.toString())
            respose.end(`formdata:${data.toString()}`)
        });
    } else {
        respose.writeHead( 404, {
            "Content-Type": 'text/plain;charset=utf-8'
        })
        respose.end('404 页面不存在')
    }
}).listen(4000, ()=> {
    console.log('http://localhost:4000')
})