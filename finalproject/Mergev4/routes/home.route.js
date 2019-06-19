var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport =require('passport');
var postModel = require('../models/post.model');
var auth = require('../middlewares/auth');
var authlocals = require('../middlewares/auth-locals.mdw');

var router = express.Router();

router.get('/', (req,res,next)=>{
    postModel.loadPostFourTable().then(rows => {
        rows[0][0]['postPlace'] = true;
        rows[0][1]['postPlace'] = false;
        rows[0][2]['postPlace'] = false;
        for (var i=0;i<10;i++)
        {
            if(i%2 ===0){
                rows[1][i]['postPlace'] = true;
                rows[2][i]['postPlace'] = true;
            }
            else {
                rows[1][i]['postPlace'] = false;
                rows[2][i]['postPlace'] = false;
            }
        }
        for (var i=0;i<10;i++){
            
        }
        res.render('home',{          
            list: rows[0],
            mostView: rows[1],
            listDay:rows[2]

        });
    }).catch(err => {
        console.log(err);
    })
})

router.get('/search/:name', (req,res,next)=>{
    var name = req.params.name;

    postModel.loadSearch(name).then(rows => {
        
        res.render('search/search',{
            list: rows,
        });
    })
})

module.exports = router;