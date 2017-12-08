import React from 'react'
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'

export default (title, countTitle, key, numFormat = num => num) => connect(state => state[key] || {tops:[], otherCount: 0})(props => {
  const backgroundColor = [
    '#E54B35',
    '#36A2EB',
    '#FFCE56',
    '#9abe1f',
    '#f4d000',
    '#01b2bc'
  ]
  const hoverBackgroundColor = [
    '#E54B35',
    '#36A2EB',
    '#FFCE56',
    '#9abe1f',
    '#f4d000',
    '#01b2bc'
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
          {props.tops.map((row, index) => <tr key={index}><td>{row.ip}</td><td>{numFormat(row.count)}</td></tr>)}
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
