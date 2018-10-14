import {RECEIVE_MISSILES , TRANSITION_MISSILE, TRANSFER_MISSILE, REMOVE_MISSILE, ADD_MISSILE} from '../actions/equipment'

export default function pumps (state=[], action){
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
            pump.unitnumber != action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_MISSILE:
          let filteredMissiles = [...state.filter(missile => missile.unitnumber != action.unitnumber)]
          return filteredMissiles

        case ADD_MISSILE:
          return [...state, action.unitnumber]


      default:
        return state
  }
}
