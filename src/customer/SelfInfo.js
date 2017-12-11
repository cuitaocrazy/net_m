import React from 'react'
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'

const defVal = {
  totalDownload: '0',
  download: '0',
  totalDownloadNum: 0,
  downloadNum: 0,
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
  const labels = ['自己', '全部']
  const backgroundColor = [
    '#E54B35',
    '#36A2EB',
    '#FFCE56'
  ]
  const hoverBackgroundColor = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
  ]

  const getCData = (selfData, totaldata) => ({
    labels,
    datasets: [{
      data: [selfData, totaldata],
      backgroundColor,
      hoverBackgroundColor
    }]
  })
  return <div>
    <span key='td'>总下载量: {props.totalDownload}</span><br />
    <span key='d'>本机下载量: {props.download}</span><br />
    <span key='tds'>总下载速率: {props.totalDownSpeed}K</span><br />
    <span key='tus'>总上传速率: {props.totalUpSpeed}K</span><br />
    <span key='ds'>本机下载速率: {props.downSpeed}K</span><br />
    <span key='us'>本机上传速率: {props.upSpeed}K</span><br />
    <span key='tocc'>总链接个数: {props.totalConnectionCount}</span><br />
    <span key='ttcc'>TCP总链接个数: {props.totalTcpConnectionCount}</span><br />
    <span key='tucc'>UDP总链接个数: {props.totalUdpConnectCount}</span><br />
    <span key='cc'>本机链接个数: {props.connectionCount}</span><br />
    <span key='tcc'>TCP本机链接个数: {props.tcpConnectionCount}</span><br />
    <span key='ucc'>UDP总链接个数: {props.udpConnectCount}</span><br />
  </div>
})
