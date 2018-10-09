export const RECEIVE_TREATERS = 'RECEIVE_TREATERS'

export function receiveTreaters (treaters) {
  return {
    type: RECEIVE_TREATERS,
    treaters
  }
}
