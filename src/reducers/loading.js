import { TOGGLE_LOADING } from '../actions/generic'

export default function loading (state=false, action) {
  switch(action.type){
    case TOGGLE_LOADING:
      return !state

    default:
      return state
  }

}
