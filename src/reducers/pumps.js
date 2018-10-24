import {RECEIVE_PUMPS , TRANSITION_PUMP, TRANSFER_PUMP, REMOVE_PUMP, ADD_PUMP, ADD_PUMP_NOTE, REMOVE_PUMP_NOTE} from '../actions/equipment'
import { UPDATE_HOURS, UPDATE_PUMP_HOURS } from '../actions/pumps'

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
            pump.unitnumber !== action.dragId),
            action.newItem]
          return newPumps

        case REMOVE_PUMP:
          let filteredPumps = [...state.filter(pump => pump.unitnumber !== action.unitnumber)]
          return filteredPumps

        case ADD_PUMP:
          return [...state, action.unitnumber]

        case ADD_PUMP_NOTE:
          let pumpIndex = state.findIndex((unit) => unit.unitnumber === action.unitnumber)
          const noteEdit = state.slice(0, pumpIndex).concat(
            {...state[pumpIndex],
            notes: [...state[pumpIndex].notes, action.note]
          }, state.slice(pumpIndex + 1))
          return noteEdit

        case REMOVE_PUMP_NOTE:
          let removeIndex = state.findIndex((unit) => unit.unitnumber === action.unitnumber)
          let editedUnit = state.slice(0, removeIndex).concat(
            {...state[removeIndex],
            notes: state[removeIndex].notes.slice(0, action.index).concat(state[removeIndex].notes.slice(action.index + 1))
          }, state.slice(removeIndex + 1))
          return editedUnit

        case UPDATE_HOURS:
          let editIndex = state.findIndex((unit) => unit.unitnumber === action.unitnumber)
          const editedPumps = state.slice(0, editIndex).concat({...state[editIndex],
            pump_hours: action.hoursObject.pump_hours,
            hole_1_life: action.hoursObject.hole_life[0],
            hole_2_life: action.hoursObject.hole_life[1],
            hole_3_life: action.hoursObject.hole_life[2],
            hole_4_life: action.hoursObject.hole_life[3],
            hole_5_life: action.hoursObject.hole_life[4],
            previous_hours: {...action.hoursObject.previous_hours}
          }, state.slice(editIndex + 1))
          return editedPumps

          case UPDATE_PUMP_HOURS:
            let hourUpdateIndex = state.findIndex((unit) => unit.unitnumber === action.unitnumber)
            const editedHours = state.slice(0, hourUpdateIndex).concat({...state[hourUpdateIndex],
              pump_hours: action.hours,
              hole_1_life: action.hours - state[hourUpdateIndex].previous_hours.hole_1,
              hole_2_life: action.hours - state[hourUpdateIndex].previous_hours.hole_2,
              hole_3_life: action.hours - state[hourUpdateIndex].previous_hours.hole_3,
              hole_4_life: action.hours - state[hourUpdateIndex].previous_hours.hole_4,
              hole_5_life: action.hours - state[hourUpdateIndex].previous_hours.hole_5,
            }, state.slice(hourUpdateIndex + 1))
            return editedHours


      default:
        return state
  }
}
