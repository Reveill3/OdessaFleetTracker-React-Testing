import { TOGGLE_LOADING } from '../actions/generic'

export default function loading (state={
  'hydration': false,
  'blender': false,
  'pump': false,
  'float': false,
  'missile': false,
  'data_van': false,
  'crew_van': false,
  'chem_add': false,
  'transit': false
}, action) {
  switch(action.type){
    case TOGGLE_LOADING:
      return {
        ...state,
          [action.equipment_type] : !state[action.equipment_type]
      }

    default:
      return state
  }

}
