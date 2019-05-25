var express = require('express');
var router = express.Router();
var categoryModel = require('../../models/category.model')

router.get('/',(req,res)=>{
    var p = categoryModel.all();
    p.then(rows=>{
        //console.log(rows);
        res.render('admin/categories/index',{
            categories: rows,
            title: 'Administrator',
        });
    }).catch(err=>{
        console.log(err);
    });
})

router.get('/update/:id',(req,res)=>{
    var id = req.params.id;

    categoryModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/categories/update',{
                error: false,
                category: rows[0]
            });
        }else{
            res.render('admin/categories/update',{
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
        cateID: req.body.inputcateID,
        cateName: req.body.inputcateName,
        postCounter: req.body.inputpostCounter,
        cateLink: req.body.inputcateLink,

    }

    categoryModel.update(entity).then(n=>{
        res.redirect('/admin/categories');
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/add',(req,res)=>{
    res.render('admin/categories/add',{
        title: 'Add Category',
    });
})

router.post('/add',(req,res)=>{
    // res.render('admin/categories/add',{
    //     title: 'Add Category',
    // });

    // console.log(req.body);
    // res.end('...');
    var entity = {
        cateName: req.body.inputcateName,
        postCounter: req.body.inputpostCounter,
        cateLink: req.body.inputcateLink,

    }
    categoryModel.add(entity).then((id)=>{
        console.log(id);
        res.render('admin/categories/add',{
            title: 'Add Category',
        });
    }).catch(err=>{
        console.log(err);
    });
})



router.get('/delete/:id',(req,res)=>{
    var id = req.params.id;

    categoryModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/categories/delete',{
                error: false,
                category: rows[0]
            });
        }else{
            res.render('admin/categories/delete',{
                error: true
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/delete',(req,res)=>{
    
    categoryModel.delete(req.body.inputcateID).then(n=>{
        res.redirect('/admin/categories');
    }).catch(err=>{
        console.log(err);
    });
})

module.exports=router;