export const RECEIVE_PUMPS = 'RECEIVE_PUMPS'
export const TRANSITION_PUMP = 'TRANSITION_PUMP'
export const TRANSFER_PUMP = 'TRANSFER_PUMP'

export function receivePumps (pumps) {
  return {
    type: RECEIVE_PUMPS,
    pumps
  }
}

export function transitionPump (dragCard, hoverCard, index) {
  return {
    type: TRANSITION_PUMP,
    dragCard,
    hoverCard,
    index
  }
}

export function transferPump (dragId, newItem) {
  return {
    type: TRANSFER_PUMP,
    dragId,
    newItem
  }
}
