import {RECEIVE_DATAVAN , TRANSITION_DATAVAN, TRANSFER_DATAVAN, REMOVE_DATAVAN, ADD_DATAVAN} from '../actions/equipment'

export default function data_vans (state=[], action){
  switch(action.type){
    case RECEIVE_DATAVAN:
      return action.equipment

      case TRANSITION_DATAVAN:
        let newList = state
        const dragIndex = state.findIndex(x => x.unitnumber === action.dragCard.unitnumber)
        newList.splice(action.index, 1, action.dragCard)
        newList.splice(dragIndex, 1, action.hoverCard)
        return newList

        case TRANSFER_DATAVAN:
          let newPumps = [...state.filter(pump =>
            pump.unitnumber != action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_DATAVAN:
          let filteredBlenders = [...state.filter(blender => blender.unitnumber != action.unitnumber)]
          return filteredBlenders

        case ADD_DATAVAN:
          return [...state, action.unitnumber]

      default:
        return state
  }
}
