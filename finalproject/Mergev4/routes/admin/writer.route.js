var express = require('express');
var router = express.Router();
var moment = require('moment');
var postModel = require('../../models/post.model');





router.get('/',(req,res)=>{
    var id = 1;
    postModel.listCDDLoad(id).then(rows=>{
        if(rows.length>0){
            res.render('writer/writer_listCDD',{
                error: false,
                postCDD: rows,
                layout: false
                
            });
        }else{
            res.render('writer/writer_listCDD',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.get('/show/:id',(req,res)=>{
    var postid = req.params.id;

    postModel.singleLoad(postid).then(rows=>{
        if(rows.length>0){
            res.render('writer/post_detail',{
                error: false,
                viewpost: rows[0],
                layout: false
            });
        }else{
            res.render('writer/post_detail',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})

router.get('/add',(req,res)=>{

    

    postModel.loadtwotable().then(rows=>{
        if(rows.length>0){
            res.render('writer/writer_add',{
                error: false,
                categories: rows[0],
                tags: rows[1],
                layout: false
                
            });
        }else{
            res.render('writer/writer_add',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})
router.post('/add',(req,res)=>{
    var writerID=1;
    var now = moment().format('YYYY-MM-DD');
    var trangthai = 'CDD';
    var luotview = 0;
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
        postWriterID: writerID,
    }
    postModel.add(entity).then((id)=>{
        console.log(id);
        res.redirect('/writer');
    }).catch(err=>{
        console.log(err);
    });
})
//UPDATEEEEEEEEEEEEEEEEEEEEEEEEEEEE CDD
router.get('/update/:id',(req,res)=>{
    var postid = req.params.id;
    var writerid = 1;

    postModel.loadthreetable(postid,writerid).then(rows=>{
        if(rows.length>0){
            
            console.log(rows[0]);
            console.log(rows[1]);
            console.log(rows[2]);
            res.render('writer/post_update',{
                error: false,
                categories: rows[0],
                tags: rows[1],
                viewpost: rows[2][0],
                layout: false
            });
        }else{
            res.render('writer/post_update',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})

router.post('/update',(req,res)=>{
    var writerID=1;
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
        postWriterID: writerID,
    }
    postModel.update(entity).then((id)=>{
        console.log(id);
        res.redirect('/writer');
    }).catch(err=>{
        console.log(err);
    });
})
//UPDATEEEEEEEEEEEEEEEEEEEEEEEEEEEE CDD
router.get('/update/btc/:id',(req,res)=>{
    var postid = req.params.id;
    var writerid = 1;

    postModel.loadthreetable(postid,writerid).then(rows=>{
        if(rows.length>0){
            
            console.log(rows[0]);
            console.log(rows[1]);
            console.log(rows[2]);
            res.render('writer/post_update',{
                error: false,
                categories: rows[0],
                tags: rows[1],
                viewpost: rows[2][0],
                layout: false
            });
        }else{
            res.render('writer/post_update',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})

//DDD lISTTTTTTTTTTTTTTTTTTTTT
router.get('/ddd',(req,res)=>{
    var writerid = 1;
    postModel.listDDDLoad(writerid).then(rows=>{
        if(rows.length>0){
            res.render('writer/writer_listDDD',{
                error: false,
                postDDD: rows,
                layout: false
                
            });
        }else{
            res.render('writer/writer_listDDD',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})


//DXB LISSSSSSSSSSSSSSSSSSSS2qsadddddddddddddddddddd
router.get('/dxb',(req,res)=>{
    var writerid = 1;
    postModel.listDXBLoad(writerid).then(rows=>{
        if(rows.length>0){
            res.render('writer/writer_listDXB',{
                error: false,
                postDXB: rows,
                layout: false
                
            });
        }else{
            res.render('writer/writer_listDXB',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})


//BTCCCCCCCCCCCCCCCCCc2qsadddddddddddddddddddd
router.get('/btc',(req,res)=>{
    var writerid = 1;
    postModel.listBTCLoad(writerid).then(rows=>{
        if(rows.length>0){
            res.render('writer/writer_listBTC',{
                error: false,
                postBTC: rows,
                layout: false
            });
        }else{
            res.render('writer/writer_listBTC',{
                error: true,
                layout: false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})

module.exports=router;