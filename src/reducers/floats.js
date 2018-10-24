import {RECEIVE_FLOATS , TRANSITION_FLOAT, TRANSFER_FLOAT, REMOVE_FLOAT, ADD_FLOAT, ADD_FLOAT_NOTE, REMOVE_FLOAT_NOTE} from '../actions/equipment'

export default function floats (state=[], action){
  switch(action.type){
    case RECEIVE_FLOATS:
      return action.equipment

      case TRANSITION_FLOAT:
        let newList = state
        const dragIndex = state.findIndex(x => x.unitnumber === action.dragCard.unitnumber)
        newList.splice(action.index, 1, action.dragCard)
        newList.splice(dragIndex, 1, action.hoverCard)
        return newList

        case TRANSFER_FLOAT:
          let newPumps = [...state.filter(pump =>
            pump.unitnumber !== action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_FLOAT:
          let filteredFloats = [...state.filter(float => float.unitnumber !== action.unitnumber)]
          return filteredFloats

        case ADD_FLOAT:
          return [...state, action.unitnumber]

        case ADD_FLOAT_NOTE:
          let pumpIndex = state.findIndex((unit) => unit.unitnumber === action.unitnumber)
          const noteEdit = state.slice(0, pumpIndex).concat(
            {...state[pumpIndex],
            notes: [...state[pumpIndex].notes, action.note]
          }, state.slice(pumpIndex + 1))
          return noteEdit

        case REMOVE_FLOAT_NOTE:
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
