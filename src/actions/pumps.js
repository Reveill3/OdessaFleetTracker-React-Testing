export const UPDATE_HOURS = 'UPDATE_HOURS'
export const UPDATE_PUMP_HOURS = 'UPDATE_PUMP_HOURS'


export function updateHours(unitnumber, hoursObject) {
  return {
    type: UPDATE_HOURS,
    unitnumber,
    hoursObject
  }
}

export function updatePumpHours(unitnumber, hours) {
  return {
    type: UPDATE_PUMP_HOURS,
    hours,
    unitnumber
  }
}
