import {RECEIVE_CREWVAN , TRANSITION_CREWVAN, TRANSFER_CREWVAN, REMOVE_CREWVAN, ADD_CREWVAN} from '../actions/equipment'

export default function crew_vans (state=[], action){
  switch(action.type){
    case RECEIVE_CREWVAN:
      return action.equipment

      case TRANSITION_CREWVAN:
        let newList = state
        const dragIndex = state.findIndex(x => x.unitnumber === action.dragCard.unitnumber)
        newList.splice(action.index, 1, action.dragCard)
        newList.splice(dragIndex, 1, action.hoverCard)
        return newList

        case TRANSFER_CREWVAN:
          let newPumps = [...state.filter(pump =>
            pump.unitnumber != action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_CREWVAN:
          let filteredBlenders = [...state.filter(blender => blender.unitnumber != action.unitnumber)]
          return filteredBlenders

        case ADD_CREWVAN:
          return [...state, action.unitnumber]

      default:
        return state
  }
}
