import {RECEIVE_CREWVAN , TRANSITION_CREWVAN, TRANSFER_CREWVAN, REMOVE_CREWVAN, ADD_CREWVAN, ADD_CREWVAN_NOTE, REMOVE_CREWVAN_NOTE} from '../actions/equipment'

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
            pump.unitnumber !== action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_CREWVAN:
          let filteredBlenders = [...state.filter(blender => blender.unitnumber !== action.unitnumber)]
          return filteredBlenders

        case ADD_CREWVAN:
          return [...state, action.unitnumber]

        case ADD_CREWVAN_NOTE:
          let pumpIndex = state.findIndex((unit) => unit.unitnumber === action.unitnumber)
          const noteEdit = state.slice(0, pumpIndex).concat(
            {...state[pumpIndex],
            notes: [...state[pumpIndex].notes, action.note]
          }, state.slice(pumpIndex + 1))
          return noteEdit

        case REMOVE_CREWVAN_NOTE:
          let removeIndex = state.findIndex((unit) => unit.unitnumber === action.unitnumber)
          let editedUnit = state.slice(0, removeIndex).concat(
            {...state[removeIndex],
            notes: state[removeIndex].notes.slice(0, action.index).concat(state[removeIndex].notes.slice(action.index + 1))
          }, state.slice(removeIndex + 1))
          return editedUnit

      default:
        return state
  }
}
