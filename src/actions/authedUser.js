export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (crew) {
  return {
    type: SET_AUTHED_USER,
    crew
  }
}
