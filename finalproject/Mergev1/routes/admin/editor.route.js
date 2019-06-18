var express = require('express');
var router = express.Router();
var moment = require('moment');
var postModel = require('../../models/post.model');

router.get('/',(req,res)=>{
    var editorid =3;
    postModel.listChuaDuocDuyetLoad(editorid).then(rows=>{
        if(rows.length>0){
            res.render('editor/editor_index',{
                error: false,
                postCDD: rows,
                layout:false
            });
        }else{
            res.render('editor/editor_index',{
                error: true,
                layout:false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })

})
//list
router.get('/list',(req,res)=>{
    var editorid =3;
    postModel.listDaPheDuyet(editorid).then(rows=>{
        if(rows.length>0){
            res.render('editor/editor_list',{
                error: false,
                postCDD: rows,
                layout:false
            });
        }else{
            res.render('editor/editor_list',{
                error: true,
                layout:false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })

})
//Phe duyet CDD
router.get('/confirm/:id',(req,res)=>{
    var postid = req.params.id;

    postModel.loadthreetable(postid).then(rows=>{
        if(rows.length>0){

            res.render('editor/editor_pheduyet',{
                error: false,
                categories: rows[0],
                tags: rows[1],
                viewpost: rows[2][0],
                layout:false
            });
        }else{
            res.render('editor/editor_pheduyet',{
                error: true,
                layout:false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})

router.post('/confirm',(req,res)=>{
    var editorid=2;
    var trangthai = 'DDD';
    var entity = {
        postID: req.body.inputid,
        postChuyenMucID: req.body.inputchuyenmuc,
        postTagID: req.body.inputtag,
        postTrangThaiID: trangthai,
        postHangBaiViet: req.body.inputhangbaiviet,
        postEditorID: editorid,
        postNgayXuatBan: req.body.inputngayxuatban
    }
    postModel.update(entity).then((id)=>{
        console.log(id);
        res.redirect('/editor');
    }).catch(err=>{
        console.log(err);
    });
})

//tu choi 
router.get('/refuse/:id',(req,res)=>{
    var postid = req.params.id;

    postModel.loadthreetable(postid).then(rows=>{
        if(rows.length>0){

            res.render('editor/editor_tuchoi',{
                error: false,
                categories: rows[0],
                tags: rows[1],
                viewpost: rows[2][0],
                layout:false
            });
        }else{
            res.render('editor/editor_tuchoi',{
                error: true,
                layout:false
            })
        }
    }).catch(err=>{
        console.log(err);
        res.end('error occured.');
    })
})

router.post('/refuse',(req,res)=>{
    var editorid=2;
    var trangthai = 'BTC';
    var entity = {
        postID: req.body.inputid,
        postTrangThaiID: trangthai,
        postEditorID: editorid,
        postLyDoTuChoi: req.body.inputlydotuchoi,
    }
    postModel.update(entity).then((id)=>{
        console.log(id);
        res.redirect('/editor');
    }).catch(err=>{
        console.log(err);
    });
})
module.exports=router;