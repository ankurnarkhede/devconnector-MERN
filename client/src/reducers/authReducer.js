/**
 * Created by ankur at 15/1/19 7:32 PM.
 */

import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../validation/is-empty'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state
  }
}
