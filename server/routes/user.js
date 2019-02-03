const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')
const randomstring = require("randomstring");

const nodemailer = require('nodemailer');
const mandrillTransport = require('nodemailer-mandrill-transport');
const MANDRIL_KEY = 'fD-HfoAUJEab-XxZb12Q6A';

router.post('/', (req, res) => {
  console.log('user signup');

  const { email, fullname, password } = req.body

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err)
    } else if (user) {
      res.status(401).json({
        message: `Sorry, email already taken.`
      })
    }
    else {
      const verificationCode = randomstring.generate();
      const newUser = new User({
        email: email,
        password: password,
        fullname: fullname,
        verificationCode,
        isVerified: false,
      });

      const transport = nodemailer.createTransport(mandrillTransport({
        auth: {
          apiKey: MANDRIL_KEY,
        }
      }));
      transport.sendMail({
        from: 'connections@hyphenmail.com',
        to: email,
        subject: 'Verify Email - Welcome to Hyprofile',
        html: `<p>Welcome to Hyprofile, ${fullname}</p><p><a href="http://localhost:3000/verify/${verificationCode}">Click here</a> to verify your email.</p><p>Have a good day.</p>`
      }, function(err, info) {
        if (err) {
          console.error(err);
        } else {
          console.log(info);
        }
      });


      newUser.save((err, savedUser) => {
        if (err) return res.json(err)
        req.logIn(savedUser, (err1) => {
          if (err1) return res.json(err1)
          res.json({ user: savedUser.toJSON(), success: true })
        })
      })
    }
  })
})

router.post('/socialLogin', (req, res) => {
  console.log('social signup');
  const { email, name, imageUrl } = req.body
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err)
    } else if (user) {
      user.imageUrl = imageUrl;
      user.isVerified = true;
      user.save((err, savedUser) => {
        if (err) return res.json(err)
        req.logIn(savedUser, (err1) => {
          if (err1) return res.json(err1)
          res.json({ user: savedUser.toJSON(), success: true })
        })
      });
    }
    else {
      const newUser = new User({
        email: email,
        fullname: name,
        imageUrl,
        isVerified: true,
        password: randomstring.generate({
          length: 12,
          charset: 'alphabetic'
        }),
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err)
        req.logIn(savedUser, (err1) => {
          if (err1) return res.json(err1)
          res.json({ user: savedUser.toJSON(), success: true })
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
    User.findOne({ email: req.user.email }, (err, user) => {
      if(user) {
        res.send({ user: user.toJSON(), success: true });
      }
    });
    
  }
)

router.get('/', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
    
    User.findOne({ email: req.user.email }, (err, user) => {
      if(user) {
        res.json({ user: user.toJSON(), success: true })
      }
    });
  } else {
    res.status(401).json({ user: null })
  }
})

router.post('/verify', (req, res) => {
  const { verifyCode } = req.body
  User.findOne({ verificationCode: verifyCode }, (err, user) => {
    if (err) {
      res.status(404).json({ message: 'verification code invalid' })
    } else if (user) {
      user.isVerified = true;
      user.verificationCode = null;
      user.save();
      req.logIn(user, (err1) => {
        if (err1) return res.json(err1)
        res.json({ user: user.toJSON(), success: true })
      })
    }
  })
})

router.patch('/', (req, res) => {
  const { email } = req.body
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {

    } else if (user) {
      const verificationCode = randomstring.generate();
      const transport = nodemailer.createTransport(mandrillTransport({
        auth: {
          apiKey: MANDRIL_KEY,
        }
      }));
      transport.sendMail({
        from: 'connections@hyphenmail.com',
        to: email,
        subject: 'Verify Email - Welcome to Hyprofile',
        html: `<p>Welcome to Hyprofile, ${user.fullname}</p><p><a href="http://localhost:3000/verify/${verificationCode}">Click here</a> to verify your email.</p><p>Have a good day.</p>`
      }, function(err, info) {
        if (err) {
          console.error(err);
        } else {
          console.log(info);
        }
      });

      user.email = email;
      user.isVerified = false;
      user.verificationCode = verificationCode;
      user.save((err, savedUser) => {
        if (err) return res.json(err)
        req.logIn(savedUser, (err1) => {
          if (err1) return res.json(err1)
          res.json({ user: savedUser.toJSON(), success: true })
        })
      });
    }
  })
})

router.put('/', (req, res) => {
  const { imageUrl } = req.body
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {

    } else if (user) {
      user.imageUrl = imageUrl;
      user.save((err, savedUser) => {
        if (err) return res.json(err)
        req.logIn(savedUser, (err1) => {
          if (err1) return res.json(err1)
          res.json({ user: savedUser.toJSON(), success: true })
        })
      });
    }
  })
})

router.post('/logout', (req, res) => {
  
  if (req.user) {
    req.logout();
    res.send({ success: true, msg: 'logging out' })
  } else {
    res.send({ msg: 'no user to log out' })
  }
})

module.exports = router