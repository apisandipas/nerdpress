// Startup point for client application
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { composeWithDevTools } from 'redux-devtools-extension'

import Routes from './Routes'
import reducers from './reducers'
import { api } from './helpers'

import './style.sass'

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ api, req: false }))
  )
)

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
