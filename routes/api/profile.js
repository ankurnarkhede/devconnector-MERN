/**
 * Created by ankur at 12/12/18 4:25 PM.
 */


const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

/**
 * @route GET api/profile/
 * @desc GET current user's profile
 * @access Private
 *
 */
router.get('/', passport.authenticate('jwt', { session: false }), () => {

  const errors = {}
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      return res.json(profile)
    })
    .catch(err => res.status(404).json(err))

})

module.exports = router
