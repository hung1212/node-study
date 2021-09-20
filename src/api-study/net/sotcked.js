const net = require('net')
const chatServer = net.createServer()

const clientList = []
chatServer.on('connection',(client)=> {
    client.write('hi')
    clientList.push(client)

    client.on('data', data=> {
        clientList.forEach(v=> {
            data.write(v)
        })
    })
})

chatServer.listen(9000)