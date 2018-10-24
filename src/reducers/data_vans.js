import {RECEIVE_DATAVAN , TRANSITION_DATAVAN, TRANSFER_DATAVAN, REMOVE_DATAVAN, ADD_DATAVAN, ADD_DATAVAN_NOTE, REMOVE_DATAVAN_NOTE} from '../actions/equipment'

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
            pump.unitnumber !== action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_DATAVAN:
          let filteredBlenders = [...state.filter(blender => blender.unitnumber !== action.unitnumber)]
          return filteredBlenders

        case ADD_DATAVAN:
          return [...state, action.unitnumber]

        case ADD_DATAVAN_NOTE:
          let pumpIndex = state.findIndex((unit) => unit.unitnumber === action.unitnumber)
          const noteEdit = state.slice(0, pumpIndex).concat(
            {...state[pumpIndex],
            notes: [...state[pumpIndex].notes, action.note]
          }, state.slice(pumpIndex + 1))
          return noteEdit

        case REMOVE_DATAVAN_NOTE:
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
