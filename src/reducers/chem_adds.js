import {RECEIVE_CHEM , TRANSITION_CHEM, TRANSFER_CHEM, REMOVE_CHEM, ADD_CHEM} from '../actions/equipment'

export default function chem_adds (state=[], action){
  switch(action.type){
    case RECEIVE_CHEM:
      return action.equipment

      case TRANSITION_CHEM:
        let newList = state
        const dragIndex = state.findIndex(x => x.unitnumber === action.dragCard.unitnumber)
        newList.splice(action.index, 1, action.dragCard)
        newList.splice(dragIndex, 1, action.hoverCard)
        return newList

        case TRANSFER_CHEM:
          let newPumps = [...state.filter(pump =>
            pump.unitnumber != action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_CHEM:
          let filteredBlenders = [...state.filter(blender => blender.unitnumber != action.unitnumber)]
          return filteredBlenders

        case ADD_CHEM:
          return [...state, action.unitnumber]

      default:
        return state
  }
}
