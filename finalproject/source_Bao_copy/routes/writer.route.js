var express = require('express');
var router = express.Router();
var writerModel = require('../models/writer.model');



router.get('/',(req,res)=>{
    res.render('vwWriter/writer');
});


router.post('/', (req, res) => {
    
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

    // var entity = {
    //     txtPlace=req.body.txtPlace
    // }
    // writerModel.add(entity)
    // .then(id => {
    //     res.render('vwWriter/writer');
    // })
    // .catch(err => {
    //     console.log(err)
    // })
    res.end('...')
  
});

module.exports = router;