import React from 'react'
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'

export default (title, countTitle, key, numFormat = num => num) => connect(state => state[key] || {tops:[], otherCount: 0})(props => {
  const backgroundColor = [
    '#eb4435',
    '#fba7b3',
    '#fcbd05',
    '#eef020',
    '#ccff99',
    '#00a6f9'
  ]
  const hoverBackgroundColor = [
    '#962b22',
    '#a06b72',
    '#a17903',
    '#989914',
    '#82a362',
    '#006a9f'
  ]

  const labels = props.tops.map(row => row.ip)
  labels.push('其他人员')
  const data = props.tops.map(row => row.count)
  data.push(props.otherCount)

  return <div className='card'>
    <div className='card-body'>
      <h4 className='card-title'>{title}</h4>
      <table className='table table-striped'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>IP</th>
            <th scope='col'>{countTitle}</th>
          </tr>
        </thead>
        <tbody>
          {props.tops.map((row, index) => <tr key={index}><td>{row.ip}<br /><small className='text-muted'>{row.mac}</small><br /><small className='text-muted'>{row.hostName}</small></td><td>{numFormat(row.count)}</td></tr>)}
        </tbody>
      </table>
      <Doughnut data={{
        labels,
        datasets: [{
          data,
          backgroundColor,
          hoverBackgroundColor
        }]
      }} />
    </div>
  </div>
})
