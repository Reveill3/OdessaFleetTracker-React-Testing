import { _getPumps, _getBlenders, _getHydrations, _getFloats, _getMissiles } from '../utils/data'
import { receiveEquipment } from './equipment'
import { toggleLoading } from './generic'

export default function handleInitialData (type) {
  return (dispatch) => {
    dispatch(toggleLoading())
    _getPumps().then(
      (pumps) => {
        dispatch(receiveEquipment(pumps, 'pumps'))
        dispatch(toggleLoading())
      }
    )
    _getBlenders().then(
      (blenders) => {
        dispatch(receiveEquipment(blenders, 'blenders'))
        dispatch(toggleLoading())
      }
    )
    _getHydrations().then(
      (hydrations) => {
        dispatch(receiveEquipment(hydrations, 'hydrations'))
        dispatch(toggleLoading())
      }
    )
    _getFloats().then(
      (floats) => {
        dispatch(receiveEquipment(floats, 'floats'))
        dispatch(toggleLoading())
      }
    )
    _getMissiles().then(
      (missiles) => {
        dispatch(receiveEquipment(missiles, 'missiles'))
        dispatch(toggleLoading())
      }
    )

  }

}
