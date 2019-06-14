var express = require('express');
var router = express.Router();
var editorModel = require('../models/editor.model');



router.get('/',(req,res)=>{
    var p = editorModel.all();
    p.then(row =>{
         //console.log(rows);
         res.render('vwEditor/Main',{
             postdetail : row
         });
    }).catch(err => {
        console.log(err);
        res.end('error occured')
    });
    
});

router.get('/edit/:id',(req,res)=>{
    var id = req.params.id;
    editorModel.single(id).then(rows => {
        if (rows.length >0) {
            res.render('vwEditor/editor',{
                error: false,
                postdetail : rows[0]        //tên bảng
            });
        } else {
            res.render('vwEditor/editor',{
                error: true
            });
        }
    }).catch(err => {
        console.log(err);
        res.end('error occured')
    });
//  res.render('vwEditor/editor');
});


router.get('/view/:id',(req,res)=>{
    var id = req.params.id;
    editorModel.single(id).then(rows => {
        if (rows.length >0) {
            res.render('vwEditor/postdraft',{
                error: false,
                postdetail : rows[0]        //tên bảng
            });
        } else {
            res.render('vwEditor/postdraft',{
                error: true
            });
        }
    }).catch(err => {
        console.log(err);
        res.end('error occured')
    });
//  res.render('vwEditor/editor');
});


router.post('/update', (req, res) => {
    editorModel.update(req.body).then(n => {
      res.redirect('/editor');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })

module.exports = router;