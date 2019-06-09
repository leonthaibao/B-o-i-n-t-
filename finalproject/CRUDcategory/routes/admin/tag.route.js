var express = require('express');
var router = express.Router();
var categoryModel = require('../../models/tag.model')

router.get('/',(req,res)=>{
    var p = categoryModel.all();
    p.then(rows=>{
        //console.log(rows);
        res.render('admin/tags/tag_index',{
            tags: rows,
            title: 'Administrator',
        });
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/add',(req,res)=>{
    res.render('admin/tags/tag_add',{
        title: 'Thêm tag',
    });
})

router.post('/add',(req,res)=>{
    var entity = {
        tagName: req.body.inputtagName,
        tagSoBaiViet: req.body.inputtagSoBaiViet,
        tagLink: req.body.inputtagLink,

    }
    categoryModel.add(entity).then((id)=>{
        console.log(id);
        res.render('admin/tags/tag_add',{
            title: 'Thêm tag',
        });
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/update/:id',(req,res)=>{
    var id = req.params.id;

    categoryModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/tags/tag_update',{
                error: false,
                tag: rows[0]
            });
        }else{
            res.render('admin/tags/tag_update',{
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
        tagID: req.body.inputtagID,
        tagName: req.body.inputtagName,
        tagSoBaiViet: req.body.inputtagSoBaiViet,
        tagLink: req.body.inputtagLink,

    }

    categoryModel.update(entity).then(n=>{
        res.redirect('/admin/tags');
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/delete/:id',(req,res)=>{
    var id = req.params.id;

    categoryModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/tags/tag_delete',{
                error: false,
                tag: rows[0]
            });
        }else{
            res.render('admin/tags/tag_delete',{
                error: true
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/delete',(req,res)=>{
    
    categoryModel.delete(req.body.inputtagID).then(n=>{
        res.redirect('/admin/tags');
    }).catch(err=>{
        console.log(err);
    });
})

module.exports=router;