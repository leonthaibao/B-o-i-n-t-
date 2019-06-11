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

router.get('/add',(req,res)=>{
    res.render('admin/posts/post_add',{
        title: 'Thêm bài viết',
    });
})

router.post('/add',(req,res)=>{
    var entity = {
        postName: req.body.inputpostName,
        postStatus: req.body.inputpostStatus,
        postLink: req.body.inputpostLink,

    }
    postModel.add(entity).then((id)=>{
        console.log(id);
        res.render('admin/posts/post_add',{
            title: 'Thêm bài viết',
        });
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/update/:id',(req,res)=>{
    var id = req.params.id;

    postModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/posts/post_update',{
                error: false,
                post: rows[0]
            });
        }else{
            res.render('admin/posts/post_update',{
                error: true
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/update',(req,res)=>{
    var entity = {
        postID: req.body.inputpostID,
        postName: req.body.inputpostName,
        postStatus: req.body.inputpostStatus,
        postLink: req.body.inputpostLink,

    }

    postModel.update(entity).then(n=>{
        res.redirect('/admin/posts');
    }).catch(err=>{
        console.log(err);
    });
})

router.get('/delete/:id',(req,res)=>{
    var id = req.params.id;

    postModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/posts/post_delete',{
                error: false,
                post: rows[0]
            });
        }else{
            res.render('admin/posts/post_delete',{
                error: true
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/delete',(req,res)=>{
    
    postModel.delete(req.body.inputpostID).then(n=>{
        res.redirect('/admin/posts');
    }).catch(err=>{
        console.log(err);
    });
})



module.exports=router;