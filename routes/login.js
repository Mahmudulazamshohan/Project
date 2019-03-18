const express = require('express');
const SHA256 = require('crypto-js/sha256');
const passport = require('passport');
var router = express.Router();

router.get('/',(req,res,next)=>{
    var sess = req.session;
    console.log(sess.name);
    // if(sess.name){
    //     console.log(sess.name);
    // }
  
    var _token = SHA256(Math.random()*100);
    
   var a = [1,2,3,1,2,3];
    return res.render('login',{home:"Shohan",a});
});
router.post('/',(req,res)=>{

});
router.get('/test',(req,res)=>{
    return res.send('login test');
});
router.post('/',(req,res)=>{
   res.send(req.body);
});
module.exports = router;