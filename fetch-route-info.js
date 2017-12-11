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
    let result

    const contentRegx = /var arp_list=new Array\(([\s\S]*?)\);/m
    const content = text.match(contentRegx)[1]
    
    const ipMacRegx = /"(.*?);(.*?);/g
    
    const ipMacMap = {}
    
    while((result = ipMacRegx.exec(content)) != null) {
      ipMacMap[result[1]] = result[2]
    }

    const ipInfoRegx = /ip_stat\[\d+\]=(\[.*?\]);/g
    const as = []
    while((result = ipInfoRegx.exec(text)) != null) {
      const ipInfo = eval(result[1])
      ipInfo.push(ipMacMap[ipInfo[0]] || '未知')
      as.push(ipInfo)
    }
    evtEmt.emit('data', as)
    console.log(as)
    
  }, 1000)
}

work()

module.exports = evtEmt
