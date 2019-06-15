var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport =require('passport');
var userModel = require('../models/user.model');
var auth = require('../middlewares/auth');
var authlocals = require('../middlewares/auth-locals.mdw');

var router = express.Router();

router.get('/is-available', (req,res,next)=>{
  var username = req.query.username;
  userModel.singleByUserName(username).then(rows =>{
    if(rows.length > 0)
    {
      return res.json(false);
    }
    return res.json(true);
  })
    
})

router.get('/register', (req,res,next)=>{
    res.render('vwAccount/registertest');
})

router.post('/register', (req,res,next)=>{
    var saltRound = bcrypt.genSaltSync(5);
    var hash = bcrypt.hashSync(req.body.password,saltRound);

    var ret = bcrypt.compareSync(req.body.password,hash);
    var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY/MM/DD');

    var entity = {
        Username: req.body.username,
        password: hash,
        Email: req.body.emails,
        BDay: dob,

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

router.get('/forget',auth,(req,res,next)=>{
  res.render('vwAccount/forgot');
})

router.post('/forget',auth,(req,res,next)=>{
  var user = req.user;

  var saltRound = bcrypt.genSaltSync(5);
  var hash = bcrypt.hashSync(req.body.new,saltRound);

  var entity = {
        ID: user.ID,
        Username: user.Username,
        PASSWORD: hash,
        Email: user.Email,
        BDay: user.BDay,
  }
  userModel.update(entity).then(n => {
    res.redirect('/');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.get('/is-crrpassword',auth, (req,res,next)=>{
  var user = req.user;
  var password = req.query.old;
  
  if(bcrypt.compareSync(password,user.PASSWORD))
  {
    return res.json(true);
  }
  return res.json(false);
    
})
router.post('/logout', auth,(req,res,next)=>{
  req.logOut();
  res.redirect('/account/login');
})

router.get('/profile',auth,(req,res,next)=>{
  var dob = moment(req.user, 'YYYY/MM/DD').format('DD/MM/YYYY');
  var User = req.user;
  User.BDay = dob;
  res.render('vwAccount/profile',{
    user: User,
  });

})

router.post('/profile',auth,(req,res,next)=>{
  var user=req.user;
  var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY/MM/DD');
  var entity = {
        ID: user.ID,
        Email: req.body.emails,
        BDay: dob,
  }
  userModel.update(entity).then(n => {
    res.redirect('/');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

module.exports = router;