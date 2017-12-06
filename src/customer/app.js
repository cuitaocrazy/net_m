import ReactDOM from 'react-dom'
import React from 'react'
import { createStore } from 'redux'
import { createAction, createReducer } from 'redux-act'
import { Provider, connect } from 'react-redux'

import socket from 'socket.io-client'

const ls = socket('http://localhost:8081')

ls.on('news', data => {
  console.log(data)
  ls.emit('test', "hello")
})

const container = document.createElement('div')

document.body.appendChild(container)

const newDataAct = createAction()

const reducer = createReducer({
  [newDataAct]: (state, evt) => ({...state, msg: evt})
}, {msg: '123'})

const store = createStore(reducer)

const List = connect(state => {
  console.log(state)
  return state
}, { newDataAct })(function (props) {
  return <div>
    <div>{props.msg || 'hello'}</div>
    <button onClick={() => props.newDataAct('hello!!!!')}>go</button>
    </div>
})

ReactDOM.render(
  <Provider store={store}>
    <List />
  </Provider>
  , container)

