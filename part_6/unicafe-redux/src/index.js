import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const dispatch = ({ target }) => {
    store.dispatch({
      type: target.value
    })
  }

  return (
    <div>
      <button onClick={dispatch} value='GOOD'>good</button>
      <button onClick={dispatch} value='OK'>ok</button>
      <button onClick={dispatch} value='BAD'>bad</button>
      <button onClick={dispatch} value='ZERO'>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
