import {RECEIVE_HYDRATIONS , TRANSITION_HYDRATION, TRANSFER_HYDRATION, REMOVE_HYDRATION, ADD_HYDRATION, ADD_HYDRATION_NOTE, REMOVE_HYDRATION_NOTE} from '../actions/equipment'

export default function hydrations (state=[], action){
  switch(action.type){
    case RECEIVE_HYDRATIONS:
      return action.equipment

      case TRANSITION_HYDRATION:
        let newList = state
        const dragIndex = state.findIndex(x => x.unitnumber === action.dragCard.unitnumber)
        newList.splice(action.index, 1, action.dragCard)
        newList.splice(dragIndex, 1, action.hoverCard)
        return newList

        case TRANSFER_HYDRATION:
          let newPumps = [...state.filter(pump =>
            pump.unitnumber !== action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_HYDRATION:
          let filteredHydrations = [...state.filter(hydration => hydration.unitnumber !== action.unitnumber)]
          return filteredHydrations

        case ADD_HYDRATION:
          return [...state, action.unitnumber]

        case ADD_HYDRATION_NOTE:
          let pumpIndex = state.findIndex((unit) => unit.unitnumber === action.unitnumber)
          const noteEdit = state.slice(0, pumpIndex).concat(
            {...state[pumpIndex],
            notes: [...state[pumpIndex].notes, action.note]
          }, state.slice(pumpIndex + 1))
          return noteEdit

        case REMOVE_HYDRATION_NOTE:
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
