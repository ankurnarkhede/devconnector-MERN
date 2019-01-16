/**
 * Created by ankur at 16/1/19 2:42 PM.
 */

import { GET_ERRORS } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload
    default:
      return state
  }
}