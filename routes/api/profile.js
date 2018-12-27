/**
 * Created by ankur at 12/12/18 4:25 PM.
 */


const express = require('express')
const router = express.Router()

/**
 * @route GET api/profile/test
 * @desc Test Profile route
 * @access Public
 *
 */
router.get('/test', (req, res) => {
  res.json({
    msg: 'Users works'
  })
})

module.exports = router
