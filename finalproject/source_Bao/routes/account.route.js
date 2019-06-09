var express = require('express');
var brcypt = require('bcrypt');
var moment = require('moment');
var userModel = require('../models/user.model');

var router = express.Router();

router.get('/register', (req,res,next)=>{
    res.render('vwAccount/register');
})

router.post('/register', (req,res,next)=>{
    var saltRound = 10;
    var hash = brcypt.hashSync(req.body.password,saltRound);

    var entity = {
        Name: req.body.username,
        password: hash,
    }

    userModel.add(entity).then(id => {
        res.redirect('/account/login');
    })
})

router.get('/login',(req,res,next)=>{
    res.end('LOGIN');
})

module.exports = router;