import {RECEIVE_TREATERS} from '../actions/treaters'

export default function treaters(state=[], action) {
  switch(action.type) {
    case RECEIVE_TREATERS:
      return action.treaters

    default:
      return state
  }

}
