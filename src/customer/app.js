import ReactDOM from 'react-dom'
import React from 'react'
import { createStore } from 'redux'
import { createAction, createReducer } from 'redux-act'
import { Provider, connect } from 'react-redux'
import SelfInfo from './SelfInfo'

import socket from 'socket.io-client'

const ls = socket('http://10.2.53.8:7070')

ls.on('refresh', data => store.dispatch(newDataAct(data)))
ls.on('ip', ip => store.dispatch(ipAct(ip)))

const container = document.createElement('div')

document.body.appendChild(container)

const newDataAct = createAction()
const ipAct = createAction()

const reducer = createReducer({
  [newDataAct]: (state, evt) => {
    function _unitConvert(times, num) {
      if(num / 1024 < 1) {
        return {num, times}
      } else {
        return _unitConvert(times + 1, num / 1024)
      }
    }

    function unitConvert(num) {
      const s = _unitConvert(0, num)
      console.log(s)
      console.log('cuitao')
      if(s.times === 0) {
        return s.num + 'B'
      } else if(s.times === 1) {
        return s.num + 'K'
      }else if(s.times === 2) {
        return s.num + 'M'
      }else if(s.times === 3) {
        return s.num + 'G'
      }else if(s.times === 4) {
        return s.num + 'T'
      } else {
        return (s.num * Math.pow(1024, s.times - 4)) + 'T'
      }
    }
    const selfInfo = {
      totalDownload: '0',
      download: '0',
      totalDownSpeed: 0,
      totalUpSpeed: 0,
      downSpeed: 0,
      upSpeed: 0,
      totalTcpConnectionCount: 0,
      totalUdpConnectCount: 0,
      tcpConnectionCount: 0,
      udpConnectCount: 0
    }

    const findSelf = evt.find(ipInfo => ipInfo[0] === state.selfIp)

    if(findSelf) {
      selfInfo.download = findSelf[1]
      selfInfo.downSpeed = findSelf[3]
      selfInfo.upSpeed = findSelf[4]
      selfInfo.connectionCount = findSelf[5]
      selfInfo.tcpConnectionCount = findSelf[6]
      selfInfo.udpConnectCount = findSelf[7]
    }

    selfInfo.totalDownload = unitConvert(evt.reduce((total, e) => total + e[2], 0))
    return { ...state, selfInfo }
  },
  [ipAct]: (state, evt) => ({ ...state, selfIp: evt })
}, { selfIp: '未连接', ipInfoList: [] })

const store = createStore(reducer)

const List = connect(state => state, { newDataAct })(function (props) {
  return <div>
    <div>ip: {props.selfIp}</div>
    <SelfInfo />
  </div>
})

ReactDOM.render(
  <Provider store={store}>
    <List />
  </Provider>
  , container)

