import {RECEIVE_PUMPS , TRANSITION_PUMP, TRANSFER_PUMP} from '../actions/pumps'

export default function pumps (state=[], action){
  switch(action.type){
    case RECEIVE_PUMPS:
      return action.pumps

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


      default:
        return state
  }
}
