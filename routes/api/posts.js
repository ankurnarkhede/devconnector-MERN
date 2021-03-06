const express = require('express')
const router = express.Router()
const passport = require('passport')

// import models
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// load validations
const validatPostInput = require('../../validation/post')

/**
 * @route GET api/posts
 * @desc GET posts
 * @access Public
 *
 */
router.get(
  '/',
  (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({
        nopostsfound: 'No posts found',
        error: err
      }))
  }
)

/**
 * @route GET api/posts/:id
 * @desc GET post by id
 * @access Public
 *
 */
router.get(
  '/:id',
  (req, res) => {
    Post.findById(req.params.id)
      .sort({ date: -1 })
      .then(post => res.json(post))
      .catch(err => res.status(404).json({
        nopostfound: 'No post found with that ID',
        error: err
      }))
  }
)

/**
 * @route POST api/posts
 * @desc Create post
 * @access Private
 *
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatPostInput(req.body)

    // check validation
    if (!isValid) {
      // if any error, send 400 with error object
      return res.status(400).json(errors)
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    })

    newPost.save().then(post => res.json(post))
  }
)

/**
 * @route DELETE api/posts/:id
 * @desc DELETE post
 * @access Private
 *
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // check for post owner
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({ notauthorized: 'User not authorized' })
            }
            // delete
            post.remove().then(() => res.json({ success: true }))
          })
          .catch(err => res.status(404).json({
            postnotfound: 'No post found',
            error: err
          }))
      })
  }
)

/**
 * @route POST api/posts/like/:id
 * @desc like post
 * @access Private
 *
 */
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
              return res.status(400).json({ alreadyliked: 'User already liked this post' })
            }
            // Add the user id to likes array
            post.likes.unshift({ user: req.user.id })
            post.save().then(post => res.json(post))
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found', error: err }))
      })
  }
)

/**
 * @route POST api/posts/unlike/:id
 * @desc unlike post
 * @access Private
 *
 */
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
              return res.status(400).json({ alreadyliked: 'You have not yet liked this post' })
            }
            // get the remove index
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id)

            if (removeIndex >= 0) {
              // splice out of array
              post.likes.splice(removeIndex, 1)
              post.save().then(post => res.status(200).json(post))
            } else {
              res.status(404).json({ success: false, msg: 'Invalid post id' })
            }
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found', error: err }))
      })
  }
)

/**
 * @route POST api/posts/comment/:id
 * @desc Add comment to post
 * @access Private
 *
 */
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatPostInput(req.body)

    // check validation
    if (!isValid) {
      // if any error, send 400 with error object
      return res.status(400).json(errors)
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        }
        // add comment to array
        post.comments.unshift(newComment)
        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found', error: err }))
  }
)

/**
 * @route DELETE api/posts/comment/:id/:comment_id
 * @desc Remove comment from post
 * @access Private
 *
 */
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
          return res.status(404).json({ commentnotexists: 'Comment does not exist' })
        }
        // get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id)

        if (removeIndex >= 0) {
          // splice comment out of array
          post.comments.splice(removeIndex, 1)
          post.save().then(post => res.status(200).json(post))
        } else {
          res.status(404).json({ success: false, msg: 'Invalid comment id' })
        }
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found', error: err }))
  }
)

module.exports = router
