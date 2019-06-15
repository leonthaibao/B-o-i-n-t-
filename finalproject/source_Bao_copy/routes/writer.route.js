var express = require('express');
var router = express.Router();
var writerModel = require('../models/writer.model');



router.get('/',(req,res)=>{
    res.render('vwWriter/Home');
});
router.get('/writing',(req,res)=>{
    res.render('vwWriter/writer');
});
router.get('/edit',(req,res)=>{
    res.render('vwWriter/edit');
});

router.post('/', (req, res) => {
    
    // var entity = {
        
    //     editor1 = req.body.txtPlace,
    //     tieuDe = req.body.txtTitle,
    //     tomTat = req.body.txtSum,
    //     chuyenMuc = req.body.cmbCM,
    //     Tag = req.body.txtTag,
        

    // };
    
    writerModel.add(req.body)
    .then(n => {
        //res.redirect('/writer');
        res.end('...')
        // res.render('vwWriter/writer');
    })
    .catch(err => {
        console.log(err);
        res.end('...')
    })

    
  
});

module.exports = router;