import { combineReducers } from 'redux'
import pumps from './pumps'
import loading from './loading'

export default combineReducers({
  pumps,
  loading
})
