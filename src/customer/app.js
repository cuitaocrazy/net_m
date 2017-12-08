import ReactDOM from 'react-dom'
import React from 'react'
import { createStore } from 'redux'
import { createAction, createReducer } from 'redux-act'
import { Provider, connect } from 'react-redux'
import SelfInfo from './SelfInfo'
import socket from 'socket.io-client'
import { unitConvert } from '../utils'

import topCom from './top-compose'

const DownloadTop = topCom('下载量TOP5', '下载量', 'downloadTop', unitConvert)
const DownSpeedTop = topCom('下载速率TOP5', '下载速率', 'downSpeedTop', num => num + 'K')
const UpSpeedTop = topCom('上传速率TOP5', '上传速率', 'upSpeedTop', num => num + 'K')
const ConnectionCountTop = topCom('链接数TOP5', '链接数', 'connectionCountTop')
const TcpConnectionCountTop = topCom('TCP链接数TOP5', 'TCP链接数', 'tcpConnectionCountTop')
const UdpConnectionCountTop = topCom('UDP链接数TOP5', 'UDP链接数', 'udpConnectionCountTop')

const ls = socket('http://10.2.53.8:7070')

ls.on('refresh', data => store.dispatch(newDataAct(data)))
ls.on('ip', ip => store.dispatch(ipAct(ip.match(/(\d+\.\d+\.\d+\.\d+)/)[0])))

const container = document.createElement('div')

document.body.appendChild(container)

const newDataAct = createAction()
const ipAct = createAction()

const reducer = createReducer({
  [newDataAct]: (state, evt) => {
    function getTopData(index) {
      const as = evt.map(row => ({ ip: row[0], count: row[index] })).sort((a, b) => b.count - a.count)
      return {
        tops: as.splice(0, 5),
        otherCount: as.splice(5).reduce((s, e) => s + e.count, 0)
      }
    }

    function getTotal(index) {
      return evt.reduce((s, e) => s + e[index], 0)
    }

    const selfInfo = {}

    const findSelf = evt.find(ipInfo => ipInfo[0] === state.selfIp)

    if (findSelf) {
      selfInfo.download = findSelf[1]
      selfInfo.downSpeed = findSelf[3]
      selfInfo.upSpeed = findSelf[4]
      selfInfo.connectionCount = findSelf[5]
      selfInfo.tcpConnectionCount = findSelf[6]
      selfInfo.udpConnectCount = findSelf[7]
    }

    selfInfo.totalDownload = getTotal(2)
    selfInfo.totalDownSpeed = getTotal(3)
    selfInfo.totalUpSpeed = getTotal(4)
    selfInfo.totalConnectionCount = getTotal(5)
    selfInfo.totalTcpConnectionCount = getTotal(6)
    selfInfo.totalUdpConnectionCount = getTotal(7)

    selfInfo.totalDownload = evt.reduce((total, e) => total + e[2], 0)
    return { ...state, selfInfo, downloadTop: getTopData(2), downSpeedTop: getTopData(3), upSpeedTop: getTopData(4), connectionCountTop: getTopData(5), tcpConnectionCountTop: getTopData(6), udpConnectionCountTop: getTopData(7) }
  },
  [ipAct]: (state, evt) => ({ ...state, selfIp: evt })
}, { selfIp: '未连接', ipInfoList: [] })

const store = createStore(reducer)

const App = connect(state => state, { newDataAct })(function (props) {
  return <div className='container'>
    <h1>ip: {props.selfIp}</h1>
    <div className='row'>
      <div className='col-sm'>
        <SelfInfo />
      </div>
      <div className='col-sm'>
        <DownloadTop />
      </div>
      <div className='col-sm'>
        <DownSpeedTop />
      </div>
    </div>
    <div className='row'>
      <div className='col-sm'>
        <UpSpeedTop />
      </div>
      <div className='col-sm'>
        <ConnectionCountTop />
      </div>
      <div className='col-sm'>
        <TcpConnectionCountTop />
      </div>
    </div>
    <div className='row'>
      <div className='col-sm'>
        <UdpConnectionCountTop />
      </div>
      <div className='col-sm'>
      </div>
      <div className='col-sm'>
      </div>
    </div>
  </div>
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , container)

