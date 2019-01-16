/**
 * Created by ankur at 16/1/19 10:45 AM.
 */

import axios from 'axios'
import { GET_ERRORS } from './types'

// register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}