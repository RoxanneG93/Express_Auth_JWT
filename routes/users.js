var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');
// requring auth file for JWT
const auth = require("../config/auth");
// requring bcrypt for pw hashing
const bcrypt = require("bcryptjs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/signup", function (req, res, next) {
  res.render('signup')
});

router.post('/signup', function (req, res, next) {
  // setting variable and calling hasPassword method
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.send('this user already exists')
    } else {
      // create user
      models.users.create({
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Username: req.body.username,
        Password: req.body.password
      }).then(createdUser => {
        // variable isMatch calling the comparePassword method
        const isMatch = createdUser.comparePassword(req.body.password);
        // then if true setting the token
        if (isMatch) {
          const userId = createdUser.UserId;
          console.log(userId);
          const token = auth.signUser(createdUser);
          res.cookie('jwt', token);
          res.redirect('profile/' + userId);
        } else {
          console.error('not a match');
        }
      });
    }
  });

});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  // setting variable and calling hasPassword method
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    // variable isMatch calling the comparePassword method
    const isMatch = user.comparePassword(req.body.password)

    if (!user) {
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    // If true signing token
    if (isMatch) {
      const userId = user.UserId
      const token = auth.signUser(user);
      res.cookie('jwt', token);
      res.redirect('profile/' + userId)
    } else {
      console.log(req.body.password);
      res.redirect('login')
    }

  });
});


router.get('/profile/:id', auth.verifyUser, function (req, res, next) {
  if (req.params.id !== String(req.user.UserId)) {
    res.send('This is not your profile')
  } else {
    res.render('profile', {
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      Email: req.user.Email,
      UserId: req.user.UserId,
      Username: req.user.Username
    });
  }

});

// LOGOUT
router.get('/logout', function (req, res) {
  // setting cookie to null and redirecting to login page
  res.cookie('jwt', null);
  res.redirect('/users/login');
});

module.exports = router;
