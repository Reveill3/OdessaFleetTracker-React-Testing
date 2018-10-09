import {RECEIVE_FLOATS , TRANSITION_FLOAT, TRANSFER_FLOAT, REMOVE_FLOAT} from '../actions/equipment'

export default function pumps (state=[], action){
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
            pump.unitnumber != action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_FLOAT:
          let filteredFloats = [...state.filter(float => float.unitnumber != action.unitnumber)]
          return filteredFloats

      default:
        return state
  }
}
