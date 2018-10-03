import { _getCards } from '../utils/data'
import { receivePumps } from './pumps'
import { toggleLoading } from './generic'

export default function handleInitialData () {
  return (dispatch) => {
    dispatch(toggleLoading())
    return _getCards().then(
      (pumps) => {
        dispatch(receivePumps(pumps))
        dispatch(toggleLoading())
      }
    )
  }

}
