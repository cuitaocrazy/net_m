const express = require('express')
const evtEmt = require('./fetch-route-info')

function covertToByte(str) {
  const rB = /^\d+(\.\d+)?$/
  const rK = /^\d+(\.\d+)?K$/
  const rM = /^\d+(\.\d+)?M$/
  const rG = /^\d+(\.\d+)?G$/
  const rT = /^\d+(\.\d+)?T$/

  if(rB.test(str)) {
    return Number(str)
  }

  if(rK.test(str)) {
    return Number(str.substr(0, str.length - 1)) * 1024
  }

  if(rM.test(str)) {
    return Number(str.substr(0, str.length - 1)) * 1024 * 1024
  }

  if(rG.test(str)) {
    return Number(str.substr(0, str.length - 1)) * 1024 * 1024 * 1024
  }

  if(rT.test(str)) {
    return Number(str.substr(0, str.length - 1)) * 1024 * 1024 * 1024 * 1024
  }

  return -1
}

let routeData = []

evtEmt.addListener('data', data => {
  routeData = data.map(row => [row[0], row[2], covertToByte(row[2]), row[6], row[8], row[9], row[15], row[16]])
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
  socket.emit('ip', socket.handshake.address)
  socket.emit('refresh', routeData)
})
server.listen(8081)
