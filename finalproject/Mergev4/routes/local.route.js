var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport =require('passport');
var postModel = require('../models/pubpost.model');
var router = express.Router();

//list chung
router.get('/', (req, res, next) => {
    var page = req.query.page || 1;
    if (page < 1) page = 1;
  
    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        postModel.pageByPost( limit, offset),
        postModel.countByPost(),
    ]).then(([rows, count_rows]) => {
  
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
      }
  
      res.render('arrPost/list', {
        // pages,
        // title: 'Administrator',
        // layout: false
        posts: rows[0],
        pages,
        categories: rows[1],
        tags: rows[2],
        layout:false
      });
    }).catch(next);
  })

//bai viet chi tiet

router.get('/post/detail/:id',(req,res)=>{
    var postid = req.params.id;

    postModel.singleLoad(postid).then(rows=>{
        if(rows.length>0){
            res.render('arrPost/detail',{
                error: false,
                viewpost: rows[0],
                layout: false
            });
        }else{
            res.render('arrPost/detail',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
//list theo category
router.get('/category/:id', (req, res, next) => {
    var categoryid = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
  
    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        postModel.pageByPosttheocategory(categoryid, limit, offset),
        postModel.countByPosttheocategory(categoryid),
    ]).then(([rows, count_rows]) => {
  
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
      }
  
      res.render('arrPost/category', {
        // pages,
        // title: 'Administrator',
        // layout: false
        posts: rows[0],
        pages,
        categories: rows[1],
        tags: rows[2],
        layout:false
      });
    }).catch(next);
  })
//list theo tag
router.get('/tag/:id', (req, res, next) => {
    var tagid = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
  
    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        postModel.pageByPosttheotag(tagid, limit, offset),
        postModel.countByPosttheotag(tagid),
    ]).then(([rows, count_rows]) => {
  
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
      }
  
      res.render('arrPost/tag', {
        // pages,
        // title: 'Administrator',
        // layout: false
        posts: rows[0],
        pages,
        categories: rows[1],
        tags: rows[2],
        layout:false
      });
    }).catch(next);
  })
module.exports = router;