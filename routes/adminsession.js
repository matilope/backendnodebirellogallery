var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');
var User = require('../models/admin');

// Register section

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err)
      } else {
        let payload = { subject: registeredUser._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({ token })
      }
    })
  })
  
// Login section
  
router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else
          if (user.password !== userData.password) {
            res.status(401).send('Invalid Password')
          } else {
            let payload = { subject: user._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
          }
      }
    })
  })

module.exports = router;