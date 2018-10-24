import {RECEIVE_MISSILES , TRANSITION_MISSILE, TRANSFER_MISSILE, REMOVE_MISSILE, ADD_MISSILE, ADD_MISSILE_NOTE, REMOVE_MISSILE_NOTE} from '../actions/equipment'

export default function missiles (state=[], action){
  switch(action.type){
    case RECEIVE_MISSILES:
      return action.equipment

      case TRANSITION_MISSILE:
        let newList = state
        const dragIndex = state.findIndex(x => x.unitnumber === action.dragCard.unitnumber)
        newList.splice(action.index, 1, action.dragCard)
        newList.splice(dragIndex, 1, action.hoverCard)
        return newList

        case TRANSFER_MISSILE:
          let newPumps = [...state.filter(pump =>
            pump.unitnumber !== action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_MISSILE:
          let filteredMissiles = [...state.filter(missile => missile.unitnumber !== action.unitnumber)]
          return filteredMissiles

        case ADD_MISSILE:
          return [...state, action.unitnumber]

        case ADD_MISSILE_NOTE:
          let pumpIndex = state.findIndex((unit) => unit.unitnumber === action.unitnumber)
          const noteEdit = state.slice(0, pumpIndex).concat(
            {...state[pumpIndex],
            notes: [...state[pumpIndex].notes, action.note]
          }, state.slice(pumpIndex + 1))
          return noteEdit

        case REMOVE_MISSILE_NOTE:
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
