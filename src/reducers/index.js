import { combineReducers } from 'redux'
import pumps from './pumps'
import blenders from './blenders'
import hydrations from './hydrations'
import floats from './floats'
import missiles from './missiles'
import loading from './loading'
import treaters from './treaters'
import authedUser from './authedUser'

export default combineReducers({
  pumps,
  blenders,
  hydrations,
  floats,
  missiles,
  loading,
  treaters,
  authedUser
})
