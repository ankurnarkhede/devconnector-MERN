/**
 * Created by ankur at 16/1/19 10:45 AM.
 */

import { TEST_DISPATCH } from './types'

// register user
export const registerUser = (userData) => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  }
}