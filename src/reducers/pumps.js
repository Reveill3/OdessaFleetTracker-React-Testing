import {RECEIVE_PUMPS , TRANSITION_PUMP, TRANSFER_PUMP, REMOVE_PUMP, ADD_PUMP} from '../actions/equipment'

export default function pumps (state=[], action){
  switch(action.type){
    case RECEIVE_PUMPS:
      return action.equipment

      case TRANSITION_PUMP:
        let newList = state
        const dragIndex = state.findIndex(x => x.unitnumber === action.dragCard.unitnumber)
        newList.splice(action.index, 1, action.dragCard)
        newList.splice(dragIndex, 1, action.hoverCard)
        return newList

        case TRANSFER_PUMP:
          let newPumps = [...state.filter(pump =>
            pump.unitnumber != action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_PUMP:
          let filteredPumps = [...state.filter(pump => pump.unitnumber != action.unitnumber)]
          return filteredPumps

        case ADD_PUMP:
          return [...state, action.unitnumber]


      default:
        return state
  }
}
