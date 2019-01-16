/**
 * Created by ankur at 16/1/19 4:29 PM.
 */

import axios from 'axios'

const setAuthToken = token => {
  if (token) {
    // apply to every request
    axios.defaults.headers.common['Authorization'] = token
  } else {
    // delete auth header
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken

