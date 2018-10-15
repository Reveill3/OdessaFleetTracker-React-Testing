import { combineReducers } from 'redux'
import pumps from './pumps'
import blenders from './blenders'
import hydrations from './hydrations'
import floats from './floats'
import missiles from './missiles'
import loading from './loading'
import treaters from './treaters'
import authedUser from './authedUser'
import chem_adds from './chem_adds'
import data_vans from './data_vans'
import crew_vans from './crew_vans'

export default combineReducers({
  pumps,
  blenders,
  hydrations,
  floats,
  missiles,
  loading,
  treaters,
  authedUser,
  chem_adds,
  data_vans,
  crew_vans
})
