var express = require('express');
var router = express.Router();
var moment = require('moment');
var categoryModel = require('../../models/category.model');
var postModel = require('../../models/post.model');
var tagModel = require('../../models/tag.model');
var userModel = require('../../models/admin.model');
var subscriberuserModel = require('../../models/user.model')
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
        layout: false
      });
    }).catch(next);
  })



router.get('/categories/update/:id',(req,res)=>{
    var id = req.params.id;

    categoryModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/categories/update',{
                error: false,
                category: rows[0],
                layout: false
            });
        }else{
            res.render('admin/categories/update',{
                error: true,
                layout: false
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
        layout: false
    });
})

router.post('/categories/add',(req,res)=>{
    var entity = {
        cateName: req.body.inputcateName,
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
                category: rows[0],
                layout: false
            });
        }else{
            res.render('admin/categories/delete',{
                error: true,
                layout: false
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
















//danh sach bai dang chua xuat ban
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
        layout: false
      });
    }).catch(next);
})
//danh sach bai dang da xuan ban
router.get('/posts/refuselist', (req, res, next) => {
    var page = req.query.page || 1;
    if (page < 1) page = 1;
  
    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        postModel.pageByDXBPost( limit, offset),
        postModel.countByDXBPost(),
    ]).then(([rows, count_rows]) => {
  
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
      }
  
      res.render('admin/posts/post_index_2', {
        posts: rows,
        pages,
        title: 'Administrator',
        layout: false
      });
    }).catch(next);
  })

//them bai dang
router.get('/posts/add',(req,res)=>{

    

    postModel.loadtwotable().then(rows=>{
        if(rows.length>0){
            res.render('admin/posts/post_add',{
                error: false,
                categories: rows[0],
                tags: rows[1],
                layout: false
                
            });
        }else{
            res.render('admin/posts/post_add',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/posts/add',(req,res)=>{
    var now = moment().format('YYYY-MM-DD');
    var trangthai = 'CDD';
    var luotview = 0;
    var user=req.user;
    var entity = {
        postAnhTieuDe: req.body.inputfilename,
        postTieuDe: req.body.inputtieude,
        postTomTat: req.body.inputtomtat,
        postNoiDung: req.body.editor1,
        postChuyenMucID: req.body.inputchuyenmuc,
        postTagID: req.body.inputtag,
        postTrangThaiID: trangthai,
        postLuotView: luotview,
        postHangBaiViet: req.body.inputhangbaiviet,
        postNgayDang: now,
        postWriterID: user.userID,
    }
    postModel.add(entity).then((id)=>{
        console.log(id);
        res.redirect('/admin/posts');
    }).catch(err=>{
        console.log(err);
    });
})
//UPDATEEEEEEEEEEEEEEEEEEEEEEEEEEEE CDD
router.get('/posts/update/:id',(req,res)=>{
    var postid = req.params.id;
    var user = req.user;

    postModel.loadthreetable(postid,user.userID).then(rows=>{
        if(rows.length>0){
            
            res.render('admin/posts/post_update',{
                error: false,
                categories: rows[0],
                tags: rows[1],
                viewpost: rows[2][0],
                layout: false
            });
        }else{
            res.render('admin/posts/post_update',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})

router.post('/posts/update',(req,res)=>{
    var user=req.user;
    var now = moment().format('YYYY-MM-DD');
    var trangthai = 'CDD';
    var luotview = 0;
    var entity = {
        postID: req.body.inputid,
        postAnhTieuDe: req.body.inputfilename,
        postTieuDe: req.body.inputtieude,
        postTomTat: req.body.inputtomtat,
        postNoiDung: req.body.editor1,
        postChuyenMucID: req.body.inputchuyenmuc,
        postTagID: req.body.inputtag,
        postTrangThaiID: trangthai,
        postLuotView: luotview,
        postHangBaiViet: req.body.inputhangbaiviet,
        postNgayDang: now,
        postWriterID: user.userID,
    }
    postModel.update(entity).then((id)=>{
        console.log(id);
        res.redirect('/admin/posts');
    }).catch(err=>{
        console.log(err);
    });
})
//xoa bai dang
router.get('/posts/delete/:id',(req,res)=>{
    var postid = req.params.id;

    postModel.loadthreetable(postid).then(rows=>{
        if(rows.length>0){

            res.render('admin/posts/post_delete',{
                error: false,
                categories: rows[0],
                tags: rows[1],
                viewpost: rows[2][0],
                layout: false
            });
        }else{
            res.render('admin/posts/post_delete',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/posts/delete',(req,res)=>{
    
    postModel.delete(req.body.inputid).then(n=>{
        res.redirect('/admin/posts');
    }).catch(err=>{
        console.log(err);
    });
})
//xuat ban bai viet
router.get('/posts/confirm/:id',(req,res)=>{
    var postid = req.params.id;
    var user = req.user;

    postModel.loadthreetable(postid,user.userID).then(rows=>{
        if(rows.length>0){
            
            res.render('admin/posts/post_xuatban',{
                error: false,
                categories: rows[0],
                tags: rows[1],
                viewpost: rows[2][0],
                layout: false
            });
        }else{
            res.render('admin/posts/post_xuatban',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})

router.post('/posts/confirm',(req,res)=>{
    var user=req.user;
    var now = moment().format('YYYY-MM-DD');
    var entity = {
        postID: req.body.inputid,
        postTieuDe: req.body.inputtieude,
        postTrangThaiID: req.body.inputtrangthai,
        postNgayDang: now,
        postEditorID: user.userID,
    }
    postModel.update(entity).then((id)=>{
        console.log(id);
        res.redirect('/admin/posts');
    }).catch(err=>{
        console.log(err);
    });
})

//thu hoi bai viet
router.get('/posts/rollback/:id',(req,res)=>{
    var postid = req.params.id;
    var user = req.user;

    postModel.loadthreetable(postid,user.userID).then(rows=>{
        if(rows.length>0){
            
            res.render('admin/posts/post_thuhoi',{
                error: false,
                categories: rows[0],
                tags: rows[1],
                viewpost: rows[2][0],
                layout: false
            });
        }else{
            res.render('admin/posts/post_thuhoi',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})

router.post('/posts/rollback',(req,res)=>{
    var adminid=null;
    var now = null;
    var entity = {
        postID: req.body.inputid,
        postTieuDe: req.body.inputtieude,
        postTrangThaiID: req.body.inputtrangthai,
        postNgayDang: now,
        postEditorID: adminid,
    }
    postModel.update(entity).then((id)=>{
        console.log(id);
        res.redirect('/admin/posts/refuselist');
    }).catch(err=>{
        console.log(err);
    });
})









//tag reqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq

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
        layout: false
      });
    }).catch(next);
  })

router.get('/tags/add',(req,res)=>{
    res.render('admin/tags/tag_add',{
        title: 'Thêm tag',
        layout: false
    });
})

router.post('/tags/add',(req,res)=>{
    var entity = {
        tagName: req.body.inputtagName,
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
                tag: rows[0],
                layout: false
            });
        }else{
            res.render('admin/tags/tag_update',{
                error: true,
                layout: false
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
                tag: rows[0],
                layout: false
            });
        }else{
            res.render('admin/tags/tag_delete',{
                error: true,
                layout: false
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


















//writerrrrrrrrr
router.get('/users', (req, res, next) => {
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    
    var usertype =1;//writer 1, editor 2 , admin 3


    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        userModel.pageByCat(usertype, limit, offset),
        userModel.countByCat(usertype),
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
        layout: false
      });
    }).catch(next);
  })


router.get('/users/writer/add',(req,res)=>{
    res.render('admin/users/writeruser_add',{
        title: 'Thêm phóng viên',
        layout: false
    });
})

router.post('/users/writer/add',(req,res)=>{
    //writer 1, editor 2 , admin 3
    var writertype = 1;
    var entity = {
        userName: req.body.inputname,
        userPassword: req.body.inputpassword,
        userType: writertype,
    }
    userModel.add(entity).then((id)=>{
        console.log(id);
        res.redirect('/admin/users');
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/users/writer/update/:id',(req,res)=>{
    var id = req.params.id;

    userModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/users/writeruser_update',{
                error: false,
                user: rows[0],
                layout: false
            });
        }else{
            res.render('admin/users/writeruser_update',{
                error: true,
                layout: false
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
        userPassword: req.body.inputpassword,
    }

    userModel.update(entity).then(n=>{
        res.redirect('/admin/users');
    }).catch(err=>{
        console.log(err);
    });
})

router.get('/users/writer/delete/:id',(req,res)=>{
    var id = req.params.id;

    userModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/users/writeruser_delete',{
                error: false,
                user: rows[0],
                layout: false
            });
        }else{
            res.render('admin/users/writeruser_delete',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/users/writer/delete',(req,res)=>{
    
    userModel.delete(req.body.inputwriteruserID).then(n=>{
        res.redirect('/admin/users');
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
    var usertype = 2; //writer 1, editor 2, admin 3
    var limit = 6;
    var offset = (page - 1) * limit;
  
  
    Promise.all([
        userModel.pageByCat(usertype, limit, offset),
        userModel.countByCat(usertype),
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
        layout: false
      });
    }).catch(next);
  })
router.get('/users/editor/add',(req,res)=>{
    //writer 1, editor 2, admin 3
    var p = categoryModel.selectname();
    p.then(rows=>{
        //console.log(rows);
        res.render('admin/users/editoruser_add',{
            cateNames: rows,
            layout: false
        });
    }).catch(err=>{
        console.log(err);
    });
})

router.post('/users/editor/add',(req,res)=>{
    //writer 1, editor 2, admin 3
    var editortype =2 ;
    var entity = {
        userName: req.body.inputeditoruserName,
        userPassword: req.body.inputpassword,
        userType: editortype,
        userCateID: req.body.inputeditoruserCateID,
    }
    userModel.add(entity).then((id)=>{
        console.log(id);
        res.redirect('/admin/users/editor');
    }).catch(err=>{
        console.log(err);
    });
})

router.get('/users/editor/update/:id',(req,res)=>{
    var id = req.params.id;
    

    userModel.multiidname(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/users/editoruser_update',{
                error: false,
                editoruser: rows[0],
                categories: rows,
                layout: false
            });
        }else{
            res.render('admin/users/editoruser_update',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/users/editor/update',(req,res)=>{
    var editortype =2 ;
    var entity = {
        userID: req.body.inputeditoruserID,
        userName: req.body.inputeditoruserName,
        userType: editortype,
        userPassword: req.body.inputpassword,
        userCateID: req.body.inputeditoruserCateID,
    }

    userModel.update(entity).then(n=>{
        res.redirect('/admin/users/editor');
    }).catch(err=>{
        console.log(err);
    });
})


router.get('/users/editor/delete/:id',(req,res)=>{
    var id = req.params.id;
    

    userModel.multiidname(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/users/editoruser_delete',{
                error: false,
                editoruser: rows[0],
                categories: rows,
                layout: false
            });
        }else{
            res.render('admin/users/editoruser_delete',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/users/editor/delete',(req,res)=>{
    
    userModel.delete(req.body.inputeditoruserID).then(n=>{
        res.redirect('/admin/users/editor');
    }).catch(err=>{
        console.log(err);
    });
})






// SUBSCRIBERrrrrrrrrrrrrrrrrrrr
// router.get('/subscriber',(req,res)=>{
//     var p = subscriberuserModel.all();
//     p.then(rows=>{
//         console.log(rows);
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
        layout: false
      });
    }).catch(next);
  })

router.get('/users/subscriber/add',(req,res)=>{
    res.redirect('/account/register');
})




router.get('/users/subscriber/delete/:id',(req,res)=>{
    var id = req.params.id;

    subscriberuserModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('admin/users/subscriberuser_delete',{
                error: false,
                subscriberuser: rows[0],
                layout: false
            });
        }else{
            res.render('admin/users/subscriberuser_delete',{
                error: true,
                layout: false
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
module.exports=router;
















