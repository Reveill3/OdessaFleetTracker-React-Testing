import { _getPumps, _getBlenders, _getHydrations, _getFloats, _getMissiles } from '../utils/data'
import { receiveEquipment } from './equipment'
import { toggleLoading } from './generic'
import { receiveTreaters } from './treaters'

export default function handleInitialData (crew) {
  return (dispatch) => {
    const equipment_types = ['pump', 'blender', 'hydration', 'float', 'missile']
    equipment_types.forEach(type =>{
      dispatch(toggleLoading())
      fetch('http://192.168.1.173:8000/api/v1/get_equipment/',{ // TODO: replace url
        method:'POST',
        mode: 'cors',
        body: JSON.stringify({type, crew}),
        headers:{
          'Content-Type': 'application/json'
        }
          }
        ).then(
          response => response.json()
        ).then(
          (data) => {
            dispatch(receiveEquipment(data.equipment, data.type +'s'))
            dispatch(toggleLoading())
          }
        )
      })

      fetch('http://192.168.1.173:8000/api/v1/get_treaters/', {  // TODO: replace url
        mode: 'cors'
      }).then(
        response => response.json()
      ).then(data => {
        dispatch(receiveTreaters(data))
      }
      )



  }
}

export function grabList (type, crew) {
  return (dispatch) => {
  fetch('http://192.168.86.26:8000/api/v1/get_equipment/',{
    method:'POST',
    mode: 'cors',
    body: JSON.stringify({type, crew}),
    headers:{
      'Content-Type': 'application/json'
    }
      }
    ).then(
      response => response.json()
    ).then(
      (data) => {
        dispatch(receiveEquipment(data.equipment, data.type +'s'))
        dispatch(toggleLoading())
      }
    )}
}
