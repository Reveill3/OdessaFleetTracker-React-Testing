import {RECEIVE_CHEM , TRANSITION_CHEM, TRANSFER_CHEM, REMOVE_CHEM, ADD_CHEM, ADD_CHEM_NOTE, REMOVE_CHEM_NOTE} from '../actions/equipment'

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
            pump.unitnumber !== action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_CHEM:
          let filteredBlenders = [...state.filter(blender => blender.unitnumber !== action.unitnumber)]
          return filteredBlenders

        case ADD_CHEM:
          return [...state, action.unitnumber]

        case ADD_CHEM_NOTE:
          let pumpIndex = state.findIndex((unit) => unit.unitnumber === action.unitnumber)
          const noteEdit = state.slice(0, pumpIndex).concat(
            {...state[pumpIndex],
            notes: [...state[pumpIndex].notes, action.note]
          }, state.slice(pumpIndex + 1))
          return noteEdit

        case REMOVE_CHEM_NOTE:
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
