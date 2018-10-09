export const RECEIVE_PUMPS = 'RECEIVE_PUMPS'
export const RECEIVE_BLENDERS = 'RECEIVE_BLENDERS'
export const RECEIVE_HYDRATIONS = 'RECEIVE_HYDRATIONS'
export const RECEIVE_FLOATS = 'RECEIVE_FLOATS'
export const RECEIVE_MISSILES = 'RECEIVE_MISSILES'
export const TRANSITION_PUMP = 'TRANSITION_PUMP'
export const TRANSITION_BLENDER = 'TRANSITION_BLENDER'
export const TRANSITION_HYDRATION = 'TRANSITION_HYDRATION'
export const TRANSITION_FLOAT = 'TRANSITION_FLOAT'
export const TRANSITION_MISSILE = 'TRANSITION_MISSILE'
export const TRANSFER_PUMP = 'TRANSFER_PUMP'
export const TRANSFER_BLENDER = 'TRANSFER_BLENDER'
export const TRANSFER_HYDRATION = 'TRANSFER_HYDRATION'
export const TRANSFER_FLOAT = 'TRANSFER_FLOAT'
export const TRANSFER_MISSILE = 'TRANSFER_MISSILE'
export const REMOVE_PUMP = 'REMOVE_PUMP'
export const REMOVE_BLENDER = 'REMOVE_BLENDER'
export const REMOVE_HYDRATION = 'REMOVE_HYDRATION'
export const REMOVE_FLOAT = 'REMOVE_FLOAT'
export const REMOVE_MISSILE = 'REMOVE_MISSILE'


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
  }}
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
  }}
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
  }}
}
