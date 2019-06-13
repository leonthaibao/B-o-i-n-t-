var express = require('express');
var router = express.Router();
var writerModel = require('../models/writer.model');



router.get('/writer', (req,res,next)=>{
    res.render('home');
})
router.post('/writer', (req, res, next) => {
    // res.end('admin categories add');
    console.log(req.body);
    // var pp = {
    //     noidung = req.body.editor1,
    //     noidung = req.body.txtTitle,
    //     noidung = req.body.txtSum,
    //     noidung = req.body.cmbCM,
    //     noidung = req.body.txtTag,
    // };
    // class pp = {
    //     var noidung = req.body.editor1;
    //     var noidung = req.body.txtTitle;
    //     var noidung = req.body.txtSum;
    //     var noidung = req.body.cmbCM;
    //     var noidung = req.body.txtTag;
    // }
  
    writerModel.add(req.body);

    res.end('...');
});