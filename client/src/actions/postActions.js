/**
 * Created by ankur at 10/3/19 4:19 PM.
 */

import axios from 'axios'

import {
  ADD_POST,
  GET_ERRORS
} from './types'

// Add Post
export const addPost = postData => dispatch => {
  axios.post('/api/post', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}


