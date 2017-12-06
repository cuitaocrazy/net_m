const express = require('express')
const evtEmt = require('./fetch-route-info')


let routeData = []
evtEmt.addListener('data', data => {
  routeData = data
})

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/top', (req, res) => {
  res.send('hello world!')
})

app.get('/test', (req, res) => {
  res.send(routeData)
})

io.on('connection', socket => {
  console.log(socket.handshake.address)
  socket.emit('news', { hello: 'world' })
  socket.on('test', console.log)
})
server.listen(8081)
