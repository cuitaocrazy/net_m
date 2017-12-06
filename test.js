const evtEmt = require('./fetch-route-info')

evtEmt.on('data', as => {
  as.filter(row => row[0] == '10.2.53.64').forEach(console.log)
})
