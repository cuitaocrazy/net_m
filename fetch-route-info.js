const fetch = require('node-fetch')
const EventEmitter = require('events')

const evtEmt = new EventEmitter()

async function login() {
  const res = await fetch('http://10.2.53.1/userLogin.asp', {
    method: 'POST',
    headers: {
      'Referer': 'http://10.2.53.1/userLogin.asp'
    },
    body: 'save2Cookie=&vldcode=&account=admin&password=admin&btnSubmit=+%B5%C7%C2%BC+'
  })

  const body = await res.text()

  const regex = /^var\ssessionid=\"([a-z0-9]+)\";$/m

  return body.match(regex)[1]
}

async function work() {
  const sessionid = await login()
  
  setInterval(async () => {
    const logRes = await fetch('http://10.2.53.1/ip_statistics.asp?sort_turn=0&sort_item=1&max_row=1', {
      headers: {
        'Cookie': 'JSESSIONID=' + sessionid
      }
    })
    const text = await logRes.text()
    const regex = /ip_stat\[\d+\]=(\[.*?\]);/g
    let result
    const as = []
    while((result = regex.exec(text)) != null) {
      as.push(eval(result[1]))
    }
    evtEmt.emit('data', as)
  }, 5000)
}

work()

module.exports = evtEmt
