export const RECEIVE_PUMPS = 'RECEIVE_PUMPS'
export const RECEIVE_BLENDERS = 'RECEIVE_BLENDERS'
export const RECEIVE_HYDRATIONS = 'RECEIVE_HYDRATIONS'
export const RECEIVE_FLOATS = 'RECEIVE_FLOATS'
export const RECEIVE_MISSILES = 'RECEIVE_MISSILES'
export const RECEIVE_CHEM = 'RECEIVE_CHEM'
export const RECEIVE_DATAVAN = 'RECEIVE_DATAVAN'
export const RECEIVE_CREWVAN = 'RECEIVE_CREWVAN'
export const TRANSITION_PUMP = 'TRANSITION_PUMP'
export const TRANSITION_BLENDER = 'TRANSITION_BLENDER'
export const TRANSITION_HYDRATION = 'TRANSITION_HYDRATION'
export const TRANSITION_FLOAT = 'TRANSITION_FLOAT'
export const TRANSITION_MISSILE = 'TRANSITION_MISSILE'
export const TRANSITION_CHEM = 'TRANSITION_CHEM'
export const TRANSITION_DATAVAN = 'TRANSITION_DATAVAN'
export const TRANSITION_CREWVAN = 'TRANSITION_CREWVAN'
export const TRANSFER_PUMP = 'TRANSFER_PUMP'
export const TRANSFER_BLENDER = 'TRANSFER_BLENDER'
export const TRANSFER_HYDRATION = 'TRANSFER_HYDRATION'
export const TRANSFER_FLOAT = 'TRANSFER_FLOAT'
export const TRANSFER_MISSILE = 'TRANSFER_MISSILE'
export const TRANSFER_CHEM = 'TRANSFER_CHEM'
export const TRANSFER_DATAVAN = 'TRANSFER_DATAVAN'
export const TRANSFER_CREWVAN = 'TRANSFER_CREWVAN'
export const REMOVE_CHEM = 'REMOVE_CHEM'
export const REMOVE_PUMP = 'REMOVE_PUMP'
export const REMOVE_BLENDER = 'REMOVE_BLENDER'
export const REMOVE_HYDRATION = 'REMOVE_HYDRATION'
export const REMOVE_FLOAT = 'REMOVE_FLOAT'
export const REMOVE_MISSILE = 'REMOVE_MISSILE'
export const REMOVE_DATAVAN = 'REMOVE_DATAVAN'
export const REMOVE_CREWVAN = 'REMOVE_CREWVAN'
export const ADD_CHEM = 'ADD_CHEM'
export const ADD_PUMP = 'ADD_PUMP'
export const ADD_BLENDER = 'ADD_BLENDER'
export const ADD_HYDRATION = 'ADD_HYDRATION'
export const ADD_FLOAT = 'ADD_FLOAT'
export const ADD_MISSILE = 'ADD_MISSILE'
export const ADD_DATAVAN = 'ADD_DATAVAN'
export const ADD_CREWVAN = 'ADD_CREWVAN'
export const ADD_CREWVAN_NOTE = 'ADD_CREWVAN_NOTE'
export const ADD_BLENDER_NOTE = 'ADD_BLENDER_NOTE'
export const ADD_HYDRATION_NOTE = 'ADD_HYDRATION_NOTE'
export const ADD_FLOAT_NOTE = 'ADD_FLOAT_NOTE'
export const ADD_MISSILE_NOTE = 'ADD_MISSILE_NOTE'
export const ADD_DATAVAN_NOTE = 'ADD_DATAVAN_NOTE'
export const ADD_PUMP_NOTE = 'ADD_PUMP_NOTE'
export const ADD_CHEM_NOTE = 'ADD_CHEM_NOTE'
export const REMOVE_CREWVAN_NOTE = 'REMOVE_CREWVAN_NOTE'
export const REMOVE_BLENDER_NOTE = 'REMOVE_BLENDER_NOTE'
export const REMOVE_HYDRATION_NOTE = 'REMOVE_HYDRATION_NOTE'
export const REMOVE_FLOAT_NOTE = 'REMOVE_FLOAT_NOTE'
export const REMOVE_MISSILE_NOTE = 'REMOVE_MISSILE_NOTE'
export const REMOVE_DATAVAN_NOTE = 'REMOVE_DATAVAN_NOTE'
export const REMOVE_PUMP_NOTE = 'REMOVE_PUMP_NOTE'
export const REMOVE_CHEM_NOTE = 'REMOVE_CHEM_NOTE'






export function receiveEquipment (equipment, type) {
  switch(type.toLowerCase()){
    case 'pumps':
      return {
        type: RECEIVE_PUMPS,
        equipment
      }
    case 'blenders':
      return {
        type: RECEIVE_BLENDERS,
        equipment
      }
    case 'hydrations':
      return {
        type: RECEIVE_HYDRATIONS,
        equipment
      }
    case 'floats':
      return {
        type: RECEIVE_FLOATS,
        equipment
      }
    case 'missiles':
      return {
        type: RECEIVE_MISSILES,
        equipment
      }
      case 'chem_adds':
        return {
          type: RECEIVE_CHEM,
          equipment
        }
      case 'data_vans':
        return {
          type: RECEIVE_DATAVAN,
          equipment
        }
        case 'crew_vans':
          return {
            type: RECEIVE_CREWVAN,
            equipment
          }
    }
  }


export function transitionEquipment (dragCard, hoverCard, index, type) {
switch(type.toLowerCase()){
  case 'pumps':
  return {
    type: TRANSITION_PUMP,
    dragCard,
    hoverCard,
    index
  }
  case 'blenders':
  return {
    type: TRANSITION_BLENDER,
    dragCard,
    hoverCard,
    index
  }
  case 'hydrations':
  return {
    type: TRANSITION_HYDRATION,
    dragCard,
    hoverCard,
    index
  }
  case 'floats':
  return {
    type: TRANSITION_FLOAT,
    dragCard,
    hoverCard,
    index
  }
  case 'missiles':
  return {
    type: TRANSITION_MISSILE,
    dragCard,
    hoverCard,
    index
  }
  case 'chem_adds':
  return {
    type: TRANSITION_CHEM,
    dragCard,
    hoverCard,
    index
  }
  case 'data_vans':
  return {
    type: TRANSITION_DATAVAN,
    dragCard,
    hoverCard,
    index
  }
  case 'crew_vans':
  return {
    type: TRANSITION_CREWVAN,
    dragCard,
    hoverCard,
    index
  }

}
}

export function transferEquipment (dragId, newItem, type) {
switch(type.toLowerCase()){
  case 'pumps':
  return {
    type: TRANSFER_PUMP,
    dragId,
    newItem
  }
  case 'blenders':
  return {
    type: TRANSFER_BLENDER,
    dragId,
    newItem
  }
  case 'hydrations':
  return {
    type: TRANSFER_HYDRATION,
    dragId,
    newItem
  }
  case 'floats':
  return {
    type: TRANSFER_FLOAT,
    dragId,
    newItem
  }
  case 'missiles':
  return {
    type: TRANSFER_MISSILE,
    dragId,
    newItem
  }
  case 'chem_adds':
  return {
    type: TRANSFER_CHEM,
    dragId,
    newItem
  }
  case 'data_vans':
  return {
    type: TRANSFER_DATAVAN,
    dragId,
    newItem
  }
  case 'crew_vans':
  return {
    type: TRANSFER_CREWVAN,
    dragId,
    newItem
  }

}
}

export function removeEquipment (unitnumber, type) {
switch(type.toLowerCase()){
  case 'pumps':
  return {
    type: REMOVE_PUMP,
    unitnumber
  }
  case 'blenders':
  return {
    type: REMOVE_BLENDER,
    unitnumber
  }
  case 'hydrations':
  return {
    type: REMOVE_HYDRATION,
    unitnumber
  }
  case 'floats':
  return {
    type: REMOVE_FLOAT,
    unitnumber
  }
  case 'missiles':
  return {
    type: REMOVE_MISSILE,
    unitnumber
  }
  case 'chem_adds':
  return {
    type: REMOVE_CHEM,
    unitnumber
  }
  case 'data_vans':
  return {
    type: REMOVE_DATAVAN,
    unitnumber
  }
  case 'crew_vans':
  return {
    type: REMOVE_CREWVAN,
    unitnumber
  }

}
}

export function addEquipment (unitnumber, type) {
  switch(type.toLowerCase()){
    case 'pump':
    return {
      type: ADD_PUMP,
      unitnumber
    }
    case 'blender':
    return {
      type: ADD_BLENDER,
      unitnumber
    }
    case 'hydration':
    return {
      type: ADD_HYDRATION,
      unitnumber
    }
    case 'float':
    return {
      type: ADD_FLOAT,
      unitnumber
    }
    case 'missile':
    return {
      type: ADD_MISSILE,
      unitnumber
    }
    case 'chem_add':
    return {
      type: ADD_CHEM,
      unitnumber
    }
    case 'data_van':
    return {
      type: ADD_DATAVAN,
      unitnumber
    }
    case 'crew_van':
    return {
      type: ADD_CREWVAN,
      unitnumber
    }
  }
}

export function addNote (unitnumber, note, type) {
  switch(type.toLowerCase()){
    case 'pumps':
    return {
      type: ADD_PUMP_NOTE,
      unitnumber,
      note
    }
    case 'blenders':
    return {
      type: ADD_BLENDER_NOTE,
      unitnumber,
      note
    }
    case 'hydrations':
    return {
      type: ADD_HYDRATION_NOTE,
      unitnumber,
      note
    }
    case 'floats':
    return {
      type: ADD_FLOAT_NOTE,
      unitnumber,
      note
    }
    case 'missiles':
    return {
      type: ADD_MISSILE_NOTE,
      unitnumber,
      note
    }
    case 'chem_adds':
    return {
      type: ADD_CHEM_NOTE,
      unitnumber,
      note
    }
    case 'data_vans':
    return {
      type: ADD_DATAVAN_NOTE,
      unitnumber,
      note
    }
    case 'crew_vans':
    return {
      type: ADD_CREWVAN_NOTE,
      unitnumber,
      note
    }
  }
}

export function removeNote (index, unitnumber, type) {
  switch(type.toLowerCase()){
    case 'pumps':
    return {
      type: REMOVE_PUMP_NOTE,
      unitnumber,
      index
    }
    case 'blenders':
    return {
      type: REMOVE_BLENDER_NOTE,
      unitnumber,
      index
    }
    case 'hydrations':
    return {
      type: REMOVE_HYDRATION_NOTE,
      unitnumber,
      index
    }
    case 'floats':
    return {
      type: REMOVE_FLOAT_NOTE,
      unitnumber,
      index
    }
    case 'missiles':
    return {
      type: REMOVE_MISSILE_NOTE,
      unitnumber,
      index
    }
    case 'chem_adds':
    return {
      type: REMOVE_CHEM_NOTE,
      unitnumber,
      index
    }
    case 'data_vans':
    return {
      type: REMOVE_DATAVAN_NOTE,
      unitnumber,
      index
    }
    case 'crew_vans':
    return {
      type: REMOVE_CREWVAN_NOTE,
      unitnumber,
      index
    }
  }
}
