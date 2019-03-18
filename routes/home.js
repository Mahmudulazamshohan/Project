const express = require('express');
const SHA256 =  require('crypto-js/sha256');
const jwt = require('jsonwebtoken');
var {Users} = require('../models/users');

const bcrypt = require('bcryptjs');
const passport = require('passport');
var LRU = require("lru-cache")
  , options = { max: 500
              , length: function (n, key) { return n * 2 + key.length }
              , dispose: function (key, n) { n.close() }
              , maxAge: 1000 * 60 * 60 }
  , cache = LRU(options)
  , otherCache = LRU(50);


//
var router = express.Router();
//

router.get('/',(req,res,next)=>{
     
    
    console.log("Users",req.user);
     var token = jwt.sign(Math.random()*10,'shohan').toString();
    // console.log(jwt.verify(token,'shohan'));
    // console.log(sess);
    //console.log("Is Authenticate",req.isAuthenticated());
    if(req.user !=null) 
      { 
        return res.redirect('admin/dashboard');
      }
      console.log(req.flash('success').length);
      var a ;
       if(!cache.get('shohan')){
          cache.set('shohan',[1,2,3,12]);
       }else{
          console.log('get cache',cache.get('shohan'));
       }
    
    return res.render('home',{csrfToken:req.csrfToken(),site_title:"Login || Shohan",messages: req.flash('success'),a});
});
router.post('/',(req,res,next)=>{
    passport.authenticate('local', { 
    session:true,
    successRedirect: '/admin/dashboard',
    failureRedirect: '/',
    failureFlash: true })(req,res,next);
 
});
router.get('/signup',(req,res)=>{
    if(req.user !=null) 
      { 
        return res.redirect('admin/dashboard');
      }
   var token = jwt.sign(Math.random()*10,'shohan').toString();
   return  res.render('signup',{token,site_title:"Signup"});
});
router.post('/signup',(req,res)=>{
    
   var name = req.body.name;
   var password = req.body.password;
   var email = req.body.email;
   var salt = bcrypt.genSaltSync(10);
   var hashPassword = bcrypt.hashSync(password,salt);

   var users = new Users({
       name,
       password:hashPassword,
       email,
       createdAt:new Date().toDateString(),
       updatedAt:new Date().toDateString()
   });
   users.save().then((result)=>{
     //console.log(result);
   }).catch((err)=>{
      if(err){
          console.log(err);
      }
   });
   res.redirect('back');
});

router.get('/abc',(req,res)=>{
    var passwordHash = null;
   var b = bcrypt.genSaltSync(10);
   var hash = bcrypt.hashSync("Shohan",b);

   console.log(hash);
   bcrypt.compare("Shohan",hash).then((res)=>{
       console.log(res);
   }).catch((err)=>{
     
   });

   var sess = req.session;
   res.send(sess.name);

});
router.get('/api/login',(req,res,next)=>{
    //res.send({params:req.query});
   var user = Users.findOne({email:req.query.email}).then((result)=>{
          return res.json(result);
   }).catch((err)=>{
      if(err){
          console.log(err);
      }
   });
});
router.get('api/users',passport.authenticate('bearer', { session: false }),(req,res,next)=>{
   return req.json({email:req.user.email});
});

module.exports = router;