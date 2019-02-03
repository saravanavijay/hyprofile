const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')


router.post('/', (req, res) => {
  console.log('user signup');

  const { email, fullname, password } = req.body

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err)
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the email: ${email}`
      })
    }
    else {
      const newUser = new User({
        email: email,
        password: password,
        fullname: fullname,
      })
      newUser.save((err, savedUser) => {
        if (err) return res.json(err)
        req.logIn(savedUser, (err1) => {
          if (err1) return res.json(err1)
          res.json({ user: savedUser })
        })

      })
    }
  })
})

router.post(
  '/login',
  function (req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('logged in', req.user);
    var userInfo = {
      email: req.user.email,
      _id: req.user._id,
    };
    res.send({ userInfo, success: true });
  }
)

router.get('/', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
    res.json({ user: req.user })
  } else {
    res.status(401).json({ user: null })
  }
})

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.send({ success: true, msg: 'logging out' })
  } else {
    res.send({ msg: 'no user to log out' })
  }
})

module.exports = router