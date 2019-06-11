var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport =require('passport');
var userModel = require('../models/user.model');
var auth = require('../middlewares/auth');
var authlocals = require('../middlewares/auth-locals.mdw');

var router = express.Router();

router.get('/register', (req,res,next)=>{
    res.render('vwAccount/register');
})

router.post('/register', (req,res,next)=>{
    var saltRound = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(req.body.password,saltRound);

    var entity = {
        Name: req.body.username,
        password: hash,
    }

    userModel.add(entity).then(id => {
        res.redirect('/account/login');
    })
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local', (err, user, info) => {
        if (err)
          return next(err);
    
        if (!user) {
          return res.render('vwAccount/login', {
            
            err_message: info.message
          })
        }
    
        req.logIn(user, err => {
          if (err)
            return next(err);
    
          return res.redirect('/');
        });
      })(req, res, next);
})

router.get('/login',(req,res,next)=>{
    res.render('vwAccount/login');
})

router.get('/profile',auth,(req,res,next)=>{
  res.end('Profile');
})

router.post('/logout', auth,(req,res,next)=>{
  req.logOut();
  res.redirect('/account/login');
})

module.exports = router;