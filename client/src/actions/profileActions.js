/**
 * Created by ankur at 20/2/19 6:50 AM.
 */

import axios from 'axios'

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types'

// GET current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get('/api/profile').then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  ).catch(err =>
    dispatch({
      type: GET_PROFILE,
      payload: {},
      error: err
    })
  )
}

// PROFILE_LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}
