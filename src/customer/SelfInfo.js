import React from 'react'
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'
import { unitConvert } from '../utils'

const defVal = {
  totalDownload: 0,
  download: 0,
  totalDownloadNum: 0,
  downloadNum: 0,
  totalDownSpeed: 0,
  totalUpSpeed: 0,
  downSpeed: 0,
  upSpeed: 0,
  totalConnectionCount: 0,
  totalTcpConnectionCount: 0,
  totalUdpConnectionCount: 0,
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

  function getPercentage(a, b) {
    return (a * 100 / b).toFixed(2)
  }
  function getPercentageFormat(a, b) {
    return getPercentage(a, b) + ' %'
  }

  return <div className='card'>
    <div className='card-body'>
      <h4 className='card-title'>{props.hostName}</h4>
      <h6 className="card-subtitle mb-2 text-muted">{props.mac}</h6>
      <table className='table table-striped'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'></th>
            <th scope='col'>下载量</th>
            <th scope='col'>下载速率</th>
            <th scope='col'>上传速率</th>
            <th scope='col'>链接个数</th>
            <th scope='col'>TCP链接个数</th>
            <th scope='col'>UDP链接个数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>总量</td>
            <td>{unitConvert(props.totalDownload)}</td>
            <td>{unitConvert(props.totalDownSpeed * 1024)}</td>
            <td>{unitConvert(props.totalUpSpeed * 1024)}</td>
            <td>{props.totalConnectionCount}</td>
            <td>{props.totalTcpConnectionCount}</td>
            <td>{props.totalUdpConnectionCount}</td>
          </tr>
          <tr>
            <td>本机</td>
            <td>{unitConvert(props.download)}</td>
            <td>{unitConvert(props.downSpeed * 1024)}</td>
            <td>{unitConvert(props.upSpeed * 1024)}</td>
            <td>{props.connectionCount}</td>
            <td>{props.tcpConnectionCount}</td>
            <td>{props.udpConnectCount}</td>
          </tr>
          <tr>
            <td>占比</td>
            <td>{getPercentageFormat(props.download, props.totalDownload)}</td>
            <td>{getPercentageFormat(props.downSpeed, props.totalDownSpeed)}</td>
            <td>{getPercentageFormat(props.upSpeed, props.totalUpSpeed)}</td>
            <td>{getPercentageFormat(props.connectionCount, props.totalConnectionCount)}</td>
            <td>{getPercentageFormat(props.tcpConnectionCount, props.totalTcpConnectionCount)}</td>
            <td>{getPercentageFormat(props.udpConnectCount, props.totalUdpConnectionCount)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
})
