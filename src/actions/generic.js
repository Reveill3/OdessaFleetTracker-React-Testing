export const TOGGLE_LOADING = 'TOGGLE_LOADING'

export function toggleLoading (equipment_type) {
  return {
    type: TOGGLE_LOADING,
    equipment_type
  }
}
