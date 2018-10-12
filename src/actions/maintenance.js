export const RECEIVE_MAINTENANCE = 'RECEIVE_MAINTENANCE'

export function receiveMaintenance (messages) {
  return {
    action: RECEIVE_MAINTENANCE,
    messages
  }
}
