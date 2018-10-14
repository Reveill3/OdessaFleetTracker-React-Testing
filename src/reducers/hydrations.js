import {RECEIVE_HYDRATIONS , TRANSITION_HYDRATION, TRANSFER_HYDRATION, REMOVE_HYDRATION, ADD_HYDRATION} from '../actions/equipment'

export default function pumps (state=[], action){
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
            pump.unitnumber != action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_HYDRATION:
          let filteredHydrations = [...state.filter(hydration => hydration.unitnumber != action.unitnumber)]
          return filteredHydrations

        case ADD_HYDRATION:
          return [...state, action.unitnumber]


      default:
        return state
  }
}
