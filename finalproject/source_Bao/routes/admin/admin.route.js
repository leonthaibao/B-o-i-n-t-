var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var auth = require('../../middlewares/auth');
var authlocals = require('../../middlewares/auth-locals.mdw');

var router = express.Router();

router.post('/login',(req,res,next)=>{
    passport.authenticate('local', (err, user, info) => {
        if (err)
          return next(err);
    
        if (!user) {
          return res.render('vwAdmin/login', {
            
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
    res.render('vwAdmin/login');
})

module.exports = router;