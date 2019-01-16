/**
 * Created by ankur at 15/1/19 7:32 PM.
 */

import { TEST_DISPATCH } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}