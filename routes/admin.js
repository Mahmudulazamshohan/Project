const express = require('express');
const path = require('path');
var auth  = require('../config/auth');
var AuthUser  = require('../assets/authuser');
var mongoose = require('mongoose');
var router = express.Router();
var isUser = auth.isUser;
var {ChatUsers} =  require('../models/chatusers');


router.get('/dashboard',isUser,(req,res)=>{
    var auth = new AuthUser(req);

     console.log(auth.getID());
     

    res.render('dashboard',{
        site_title:"Dashboard",
        user:req.user
    });
});
router.get('/mychat/:user_id',(req,res)=>{
      var auth = new AuthUser(req);
      var data =[];
      var ObjectValid = mongoose.Types.ObjectId;
      const stackMessage = [];
      if(!ObjectValid.isValid(req.params.user_id)){
        res.render('errors/error_page',{site_title : "Error Pages",field:"Hex Format Not Valid"});
       
     }else{
        ChatUsers.find({
            user_id : mongoose.Types.ObjectId(req.params.user_id) 
        }).then((result)=>{
           
            result.forEach(e =>{
             console.log(e.user_id);
            });
            res.render('chat',{site_title : "Chat",data:result});
            //res.send(result);
          
        }).catch((err)=>{
            console.log(err);
            res.render('errors/error_page',{site_title : "Error Pages",field:"Database"});
        });
       
        console.log("Stack Message",stackMessage);
       
         var test =[{
             name:"shohan",
             password:"123"
         },{
             name:"asdasd",
             password:"123"
         }
      ];
      stackMessage.forEach(e =>{
        console.log(e);
      });
      }
      
      
      //res.send("<h1>Shohan</h1>");
    //   var chatusers =  new ChatUsers({
    //     user_id:auth.getID(),
    //     message_to:mongoose.Types.ObjectId('5a8a5bf3555bc08bbc197272'),
    //     message_text:"Hello My friend" + Math.random() * 100,
    //     message_type:"text",
    //     createdAt:new Date().toLocaleDateString(),
    //     updatedAt:new Date().toLocaleTimeString(),
    //   });
    // chatusers.save().then((result)=>{ 
    //     console.log(result);
    // }).catch((err)=>{
    //  console.log(err);


    // });
   // res.render('chat',{site_title : "Chat",data:data,test});
    });   
router.get('/file-upload',isUser,(req,res)=>{

   res.render('file-upload',
     {
         site_title:"File Upload",
         csrfToken : req.csrfToken()
     });
});
router.get('/chat-list',(req,res)=>{
    res.render('chat_list',{site_title:"Chat List"});
});

//Images response
var sharp = require('sharp');
var imageResize = require('../assets/image_resize');
router.get('/images',isUser,function (req,res) {
   var pathImgLoction  = path.join(__dirname,'../storage/abc.png')  ;
    //Display image without resize
    // console.log(pathImgLoction);
    // let transform = sharp();
    // const readStream = fs.createReadStream(pathImgLoction);
    // res.sendFile(pathImgLoction);
    res.type('image/png');
    imageResize(pathImgLoction,`png`,200,240).pipe(res);
    
 
});
router.get('/homes',isUser,function (req,res) { 
  res.send('<h1 style="text-align:center;">Shohan</h1>');
});
router.post('/store-file',isUser,(req,res)=>{
   
    if (!req.files)
         { return res.status(400).send('No files were uploaded.');}
    else{
        var imagesFile = req.files.images;
        var filename  = imagesFile.name ,
            type = imagesFile.mimetype;
      

        var uploadPath = path.join(__dirname,'../storage/'+imagesFile.name);
       
        imagesFile.mv(uploadPath,(err)=>{
           if(err){
             console.log(err);
           }
           res.redirect('/admin/file-upload');
        });
       // res.redirect('file-upload');
    }
       

    
   // if(!req.files){
    //     console.log('Found');
    //     //res.write("No File Found");
    // }else{
    //     console.log("File Not Found");
    // }
   //res.write('Shohan' + req.file);
});
router.get('/chat',isUser,(req,res)=>{
   res.render('chat',{site_title:"Chat",user:req.user,data:["name","abc"]});
});
router.get('/logout',isUser,(req,res)=>{
    req.logout();
    req.flash('success','Logout sucessfully');
    return res.redirect('/');
});
router.get('/api/cancel',(req,res)=>{
   res.send({name:'name',id:req.user.user_id});
});

module.exports = router;