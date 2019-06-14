var express = require('express');
var router = express.Router();
var moment = require('moment')
var categoryModel = require('../../models/category.model')
var postModel = require('../../models/post.model')
var tagModel = require('../../models/tag.model')
var writeruserModel = require('../../models/writeruser.model')
var subscriberuserModel = require('../../models/subscriberuser.model')
var editoruserModel = require('../../models/editoruser.model')
// router.get('/',(req,res)=>{
//     var p = categoryModel.all();
//     p.then(rows=>{
//         //console.log(rows);
//         res.render('admin/categories/index',{
//             categories: rows,
//             title: 'Administrator',
//         });
//     }).catch(err=>{
//         console.log(err);
//     });
// })

router.get('/', (req, res, next) => {
    var page = req.query.page || 1;
    if (page < 1) page = 1;
  
    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        categoryModel.pageByCat( limit, offset),
        categoryModel.countByCat(),
    ]).then(([rows, count_rows]) => {
  
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
      }
  
      res.render('admin/categories/index', {
        categories: rows,
        pages,
        title: 'Administrator',
      });
    }).catch(next);
  })



router.get('/categories/update/:id',(req,res)=>{
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
router.post('/categories/update',(req,res)=>{
    var entity = {
        cateID: req.body.inputcateID,
        cateName: req.body.inputcateName,
        postCounter: req.body.inputpostCounter,
        cateLink: req.body.inputcateLink,

    }

    categoryModel.update(entity).then(n=>{
        res.redirect('/admin');
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/categories/add',(req,res)=>{
    res.render('admin/categories/add',{
        title: 'Add Category',
    });
})

router.post('/categories/add',(req,res)=>{
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
        res.redirect('/admin');
    }).catch(err=>{
        console.log(err);
    });
})



router.get('/categories/delete/:id',(req,res)=>{
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
router.post('/categories/delete',(req,res)=>{
    
    categoryModel.delete(req.body.inputcateID).then(n=>{
        res.redirect('/admin');
    }).catch(err=>{
        console.log(err);
    });
})




router.get('/posts', (req, res, next) => {
    var page = req.query.page || 1;
    if (page < 1) page = 1;
  
    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        postModel.pageByCat( limit, offset),
        postModel.countByCat(),
    ]).then(([rows, count_rows]) => {
  
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
      }
  
      res.render('admin/posts/post_index', {
        posts: rows,
        pages,
        title: 'Administrator',
      });
    }).catch(next);
  })


router.get('/posts/add',(req,res)=>{
    res.render('admin/posts/post_add',{
        title: 'Thêm bài viết',
    });
})

router.post('/posts/add',(req,res)=>{
    var entity = {
        postName: req.body.inputpostName,
        postStatus: req.body.inputpostStatus,
        postLink: req.body.inputpostLink,

    }
    postModel.add(entity).then((id)=>{
        console.log(id);
        res.redirect('/admin/posts');
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/posts/update/:id',(req,res)=>{
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
router.post('/posts/update',(req,res)=>{
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

router.get('/posts/delete/:id',(req,res)=>{
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
router.post('/posts/delete',(req,res)=>{
    
    postModel.delete(req.body.inputpostID).then(n=>{
        res.redirect('/admin/posts');
    }).catch(err=>{
        console.log(err);
    });
})



router.get('/tags', (req, res, next) => {
    var page = req.query.page || 1;
    if (page < 1) page = 1;
  
    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        tagModel.pageByCat( limit, offset),
        tagModel.countByCat(),
    ]).then(([rows, count_rows]) => {
  
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
      }
  
      res.render('admin/tags/tag_index', {
        tags: rows,
        pages,
        title: 'Administrator',
      });
    }).catch(next);
  })

router.get('/tags/add',(req,res)=>{
    res.render('admin/tags/tag_add',{
        title: 'Thêm tag',
    });
})

router.post('/tags/add',(req,res)=>{
    var entity = {
        tagName: req.body.inputtagName,
        tagSoBaiViet: req.body.inputtagSoBaiViet,
        tagLink: req.body.inputtagLink,

    }
    tagModel.add(entity).then((id)=>{
        console.log(id);
        res.redirect('/admin/tags');
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/tags/update/:id',(req,res)=>{
    var id = req.params.id;

    tagModel.single(id).then(rows=>{
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
router.post('/tags/update',(req,res)=>{
    var entity = {
        tagID: req.body.inputtagID,
        tagName: req.body.inputtagName,
        tagSoBaiViet: req.body.inputtagSoBaiViet,
        tagLink: req.body.inputtagLink,

    }

    tagModel.update(entity).then(n=>{
        res.redirect('/admin/tags');
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/tags/delete/:id',(req,res)=>{
    var id = req.params.id;

    tagModel.single(id).then(rows=>{
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
router.post('/tags/delete',(req,res)=>{
    
    tagModel.delete(req.body.inputtagID).then(n=>{
        res.redirect('/admin/tags');
    }).catch(err=>{
        console.log(err);
    });
})



router.get('/users', (req, res, next) => {
    var page = req.query.page || 1;
    if (page < 1) page = 1;
  
    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        writeruserModel.pageByCat( limit, offset),
        writeruserModel.countByCat(),
    ]).then(([rows, count_rows]) => {
  
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
      }
  
      res.render('admin/users/user_index', {
        users: rows,
        pages,
        title: 'Administrator',
      });
    }).catch(next);
  })


router.get('/users/writer/add',(req,res)=>{
    res.render('admin/users/writeruser_add',{
        title: 'Thêm phóng viên',
    });
})

router.post('/users/writer/add',(req,res)=>{
    var entity = {
        userName: req.body.inputwriteruserName,
    }
    writeruserModel.add(entity).then((id)=>{
        console.log(id);
        res.redirect('/admin/users');
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/users/writer/update/:id',(req,res)=>{
    var id = req.params.id;

    writeruserModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/users/writeruser_update',{
                error: false,
                user: rows[0]
            });
        }else{
            res.render('admin/users/writeruser_update',{
                error: true
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/users/writer/update',(req,res)=>{
    var entity = {
        userID: req.body.inputwriteruserID,
        userName: req.body.inputwriteruserName,

    }

    writeruserModel.update(entity).then(n=>{
        res.redirect('/admin/users');
    }).catch(err=>{
        console.log(err);
    });
})

router.get('/users/writer/delete/:id',(req,res)=>{
    var id = req.params.id;

    writeruserModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/users/writeruser_delete',{
                error: false,
                user: rows[0]
            });
        }else{
            res.render('admin/users/writeruser_delete',{
                error: true
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/users/writer/delete',(req,res)=>{
    
    writeruserModel.delete(req.body.inputwriteruserID).then(n=>{
        res.redirect('/admin/users');
    }).catch(err=>{
        console.log(err);
    });
})
// SUBSCRIBERrrrrrrrrrrrrrrrrrrr
// router.get('/subscriber',(req,res)=>{
//     var p = subscriberuserModel.all();
//     p.then(rows=>{
//         //console.log(rows);
//         res.render('admin/users/subscriberuser_index',{
//             subscriberusers: rows,
//             title: 'Administrator',
//         });
//     }).catch(err=>{
//         console.log(err);
//     });
// })
router.get('/users/subscriber', (req, res, next) => {
    var page = req.query.page || 1;
    if (page < 1) page = 1;
  
    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        subscriberuserModel.pageByCat( limit, offset),
        subscriberuserModel.countByCat(),
    ]).then(([rows, count_rows]) => {
  
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
      }
  
      res.render('admin/users/subscriberuser_index', {
        subscriberusers: rows,
        pages,
        title: 'Administrator',
      });
    }).catch(next);
  })

router.get('/users/subscriber/add',(req,res)=>{
    res.render('admin/users/subscriberuser_add',{
        title: 'Thêm đọc giả',
    });
})

router.post('/users/subscriber/add',(req,res)=>{
    var day = moment(req.body.inputsubscriberuserExpiredDay,'DD/MM/YYYY').format('YYYY-MM-DD');
    var entity = {
        userName: req.body.inputsubscriberuserName,
        userExpiredDay: day,
    }
    subscriberuserModel.add(entity).then((id)=>{
        console.log(id);
        res.redirect('/admin/users/subscriber');
    }).catch(err=>{
        console.log(err);
    });
})



router.get('/users/subscriber/update/:id',(req,res)=>{
    var id = req.params.id;

    subscriberuserModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/users/subscriberuser_update',{
                error: false,
                subscriberuser: rows[0]
            });
        }else{
            res.render('admin/users/subscriberuser_update',{
                error: true
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/users/subscriber/update',(req,res)=>{
    var day = moment(req.body.inputsubscriberuserExpiredDay,'DD/MM/YYYY').format('YYYY-MM-DD');
    var entity = {
        userID: req.body.inputsubscriberuserID,
        userName: req.body.inputsubscriberuserName,
        userExpiredDay: day,
    }

    subscriberuserModel.update(entity).then(n=>{
        res.redirect('/admin/users/subscriber');
    }).catch(err=>{
        console.log(err);
    });
})
router.get('/users/subscriber/delete/:id',(req,res)=>{
    var id = req.params.id;

    subscriberuserModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/users/subscriberuser_delete',{
                error: false,
                subscriberuser: rows[0]
            });
        }else{
            res.render('admin/users/subscriberuser_delete',{
                error: true
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/users/subscriber/delete',(req,res)=>{
    
    subscriberuserModel.delete(req.body.inputsubscriberuserID).then(n=>{
        res.redirect('/admin/users/subscriber');
    }).catch(err=>{
        console.log(err);
    });
})

//Editorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
// router.get('/editor',(req,res)=>{
//     var p = editoruserModel.all();
//     p.then(rows=>{
//         //console.log(rows);
//         res.render('admin/users/editoruser_index',{
//             editorusers: rows,
//             title: 'Administrator',
//         });
//     }).catch(err=>{
//         console.log(err);
//     });
// })
router.get('/users/editor', (req, res, next) => {
    var page = req.query.page || 1;
    if (page < 1) page = 1;
  
    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        editoruserModel.pageByCat( limit, offset),
        editoruserModel.countByCat(),
    ]).then(([rows, count_rows]) => {
  
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
      }
  
      res.render('admin/users/editoruser_index', {
        editorusers: rows,
        pages,
        title: 'Administrator',
      });
    }).catch(next);
  })
router.get('/users/editor/add',(req,res)=>{
    var p = categoryModel.selectname();
    p.then(rows=>{
        //console.log(rows);
        res.render('admin/users/editoruser_add',{
            cateNames: rows,
        });
    }).catch(err=>{
        console.log(err);
    });
})
router.get('/users/editor/add',(req,res)=>{
    res.render('admin/users/editoruser_add',{
        title: 'Thêm biên tập viên',
    });
})

router.post('/users/editor/add',(req,res)=>{

    var entity = {
        userName: req.body.inputeditoruserName,
        userCateID: req.body.inputeditoruserCateID,
    }
    editoruserModel.add(entity).then((id)=>{
        console.log(id);
        res.redirect('/admin/users/editor');
    }).catch(err=>{
        console.log(err);
    });
})

router.get('/users/editor/update/:id',(req,res)=>{
    var id = req.params.id;
    

    editoruserModel.multiidname(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/users/editoruser_update',{
                error: false,
                editoruser: rows[0],
                categories: rows
            });
        }else{
            res.render('admin/users/editoruser_update',{
                error: true
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/users/editor/update',(req,res)=>{
    var entity = {
        userID: req.body.inputeditoruserID,
        userName: req.body.inputeditoruserName,
        userCateID: req.body.inputeditoruserCateID,
    }

    editoruserModel.update(entity).then(n=>{
        res.redirect('/admin/users/editor');
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/users/editor/delete/:id',(req,res)=>{
    var id = req.params.id;
    

    editoruserModel.multiidname(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/users/editoruser_delete',{
                error: false,
                editoruser: rows[0],
                categories: rows
            });
        }else{
            res.render('admin/users/editoruser_delete',{
                error: true
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/users/editor/delete',(req,res)=>{
    
    editoruserModel.delete(req.body.inputeditoruserID).then(n=>{
        res.redirect('/admin/users/editor');
    }).catch(err=>{
        console.log(err);
    });
})
module.exports=router;