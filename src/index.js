import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/index'
import middleware from './middleware'
import { composeWithDevTools } from 'redux-devtools-extension';
import Home from './components/Home';
import $ from 'jquery'
import HomePage from './components/HomePage'

const store = createStore(reducer, composeWithDevTools(middleware))
let crew=''
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'))
