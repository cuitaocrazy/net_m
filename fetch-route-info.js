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

async function getIplist(sessionid) {
  const res = await fetch('http://10.2.53.1/dhcpd_client_list.asp', {
    headers: {
      'Cookie': 'JSESSIONID=' + sessionid
    }
  })

  const text = await res.text()

  const ipHostRegx = /'(.*?);(.*?);(.*?);/g
  let result

  const ipList = {}

  while ((result = ipHostRegx.exec(text)) != null) {
    ipList[result[2]] = [result[1], result[3].trim()]
  }

  return ipList
}

function getIpMacMap(text) {
  const ipMacContentRegx = /var arp_list=new Array\(([\S\s]*?)\);/m
  let result
  const content = text.match(ipMacContentRegx)[1]
  const ipMacRegx = /"(.*?);(.*?);/g
  const ipMacMap = {}
  while (result = ipMacRegx.exec(content)) {
    ipMacMap[result[1]] = result[2]
  }

  return ipMacMap
}
async function work() {
  const sessionid = await login()

  setInterval(async () => {
    const ipList = await getIplist(sessionid)

    let result
    const logRes = await fetch('http://10.2.53.1/ip_statistics.asp?sort_turn=0&sort_item=1&max_row=1', {
      headers: {
        'Cookie': 'JSESSIONID=' + sessionid
      }
    })
    const text = await logRes.text()

    // const contentRegx = /var arp_list=new Array\(([\s\S]*?)\);/m
    // const content = text.match(contentRegx)[1]

    // const ipMacRegx = /"(.*?);(.*?);/g

    // const ipMacMap = {}

    // while((result = ipMacRegx.exec(content)) != null) {
    //   ipMacMap[result[1]] = result[2]
    // }

    const ipMacMap = getIpMacMap(text)
    const ipInfoRegx = /[^/]ip_stat\[\d+\]=(\[.*?\]);/g
    const as = []
    while ((result = ipInfoRegx.exec(text)) != null) {
      const ipInfo = eval(result[1])
      if (!ipList[ipInfo[0]]) {
        if (!ipMacMap[ipInfo[0]]) {
          ipInfo.push('未知')
        } else {
          ipInfo.push(ipMacMap[ipInfo[0]])
        }
        ipInfo.push('未知')
      } else {
        ipInfo.push(ipList[ipInfo[0]][0])
        ipInfo.push(ipList[ipInfo[0]][1])
      }

      as.push(ipInfo)
    }
    evtEmt.emit('data', as)

  }, 1000)
}

work()

module.exports = evtEmt
