import {RECEIVE_BLENDERS , TRANSITION_BLENDER, TRANSFER_BLENDER, REMOVE_BLENDER, ADD_BLENDER} from '../actions/equipment'

export default function pumps (state=[], action){
  switch(action.type){
    case RECEIVE_BLENDERS:
      return action.equipment

      case TRANSITION_BLENDER:
        let newList = state
        const dragIndex = state.findIndex(x => x.unitnumber === action.dragCard.unitnumber)
        newList.splice(action.index, 1, action.dragCard)
        newList.splice(dragIndex, 1, action.hoverCard)
        return newList

        case TRANSFER_BLENDER:
          let newPumps = [...state.filter(pump =>
            pump.unitnumber != action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_BLENDER:
          let filteredBlenders = [...state.filter(blender => blender.unitnumber != action.unitnumber)]
          return filteredBlenders

        case ADD_BLENDER:
          return [...state, action.unitnumber]

      default:
        return state
  }
}
