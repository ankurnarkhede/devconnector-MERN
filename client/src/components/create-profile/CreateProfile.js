/**
 * Created by ankur at 23/3/19 7:59 PM.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

class CreateProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: ''
    }
  }

  render () {
    return (
      <div />
    )
  }
}

export default connect(null)(CreateProfile)
