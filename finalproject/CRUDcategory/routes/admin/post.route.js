var express = require('express');
var router = express.Router();
var postModel = require('../../models/post.model')

router.get('/',(req,res)=>{
    var p = postModel.all();
    p.then(rows=>{
        //console.log(rows);
        res.render('admin/posts/post_index',{
            posts: rows,
            title: 'Administrator',
        });
    }).catch(err=>{
        console.log(err);
    });
})

module.exports=router;