var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport =require('passport');
var userModel = require('../models/user.model');

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
            layout: false,
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
    res.render('vwAccount/login',{layout:false});
})

module.exports = router;