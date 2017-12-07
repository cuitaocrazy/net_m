import React from 'react'
import { connect } from 'react-redux'

const defVal = {
  totalDownload: '0',
  download: '0',
  totalDownSpeed: 0,
  totalUpSpeed: 0,
  downSpeed: 0,
  upSpeed: 0,
  totalConnectionCount: 0,
  totalTcpConnectionCount: 0,
  totalUdpConnectCount: 0,
  connectionCount: 0,
  tcpConnectionCount: 0,
  udpConnectCount: 0
}
export default connect(state => state.selfInfo || defVal)(props => {
  return <div>
    <span key='td'>total download: {props.totalDownload}</span><br />
    <span key='d'>download: {props.download}</span><br />
    <span key='tds'>total down speed: {props.totalDownSpeed}</span><br />
    <span key='tus'>total up speed: {props.totalUpSpeed}</span><br />
    <span key='ds'>down speed: {props.downSpeed}</span><br />
    <span key='us'>up speed: {props.upSpeed}</span><br />
    <span key='tocc'>total connection count: {props.totalConnectionCount}</span><br />
    <span key='ttcc'>total tcp connection count: {props.totalTcpConnectionCount}</span><br />
    <span key='tucc'>total udp connection count: {props.totalUdpConnectCount}</span><br />
    <span key='cc'>connection count: {props.connectionCount}</span><br />
    <span key='tcc'>tcp connection count: {props.tcpConnectionCount}</span><br />
    <span key='ucc'>udp connection count: {props.udpConnectCount}</span><br />
  </div>
})