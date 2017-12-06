const express = require('express')
const evtEmt = require('./fetch-route-info')

let routeData = []
evtEmt.addListener('data', data => {
  routeData = data
})

const app = express()

app.get('/top', (req, res) => {
  res.send('hello world!')
})

app.get('/test', (req, res) => {
  res.send(routeData)
})

app.listen(8080)
