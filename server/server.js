//Import All Packages
const express  = require('express');
const path = require('path');
const bodyParser =  require('body-parser');
const session = require('express-session');
const passport = require('passport');
const connectFlash = require('connect-flash');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
//End of importing package
//-------------------------------------------
//LRU cache for cacheing data
var LRU = require("lru-cache")
  , options = { max: 500
              , length: function (n, key) { return n * 2 + key.length }
              , dispose: function (key, n) { n.close() }
              , maxAge: 1000 * 60 * 60 }
  , cache = LRU(options)
  , otherCache = LRU(50);

ejs.cache = LRU(1000);

if(cache.get('shohan')){
    console.log('get cache',cache.get('shohan'));
}else{
    cache.set('shohan',[1,2,3,12]);  
    console.log('get cache',cache.get('shohan'));
}


//File Require
const mongoose = require('./database/mongoose');
///Routers
var home = require('../routes/home');
var login = require('../routes/login');
var admin = require('../routes/admin');
//Port name
var port = process.env.port || 3000;
//Express
//-------------------------
var app  = express();
app.use(cookieParser());
//Joining Path __dirname
app.set('views',path.join(__dirname,'../views'));
//Ejs template engine
app.set('view engine','ejs');
//Express File Upload Package
app.use(fileUpload());
//Static Elements From Public folder
app.use('/public',express.static(path.join(__dirname,'../public')));
//Cookie parser

//session for authentication
app.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false 
   }
  }));


//Body Parser
//-------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport Middleware
//-------------------------

require('../config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-flash')());
app.use((req,res,next)=>{
    res.locals.messages = require('express-messages')(req,res);
    next();
});


//Csrf Token Middleware
app.use(require('csurf')({ cookie : true }));
app.use(function (err,req,res,next) {  
    if(err.code !== 'EBADCSRFTOKEN') { 
        return next(err);
    }
    res.status(404);
    res.send("Session has been expired");
});

//---------------------
  //Route started
//---------------------
app.use('/',home);
app.use('/login',login);
app.use('/admin',admin);
app.post('/store-file',function(req,res){
  console.log(req.body);
  console.log(req.files);
  if (!req.files)
       { return res.status(400).send('No files were uploaded.');}
  else{
      var imagesFile = req.files.images;
      var filename  = imagesFile.name;
       console.log(imagesFile.name);
  
      imagesFile.mv('../storage/'+filename,(err)=>{
         if(err){
             res.status(400).send(err);
         }
         res.redirect('file-upload');

      });
  }
});

//Started Server ------
//---------------------
//---------------------
app.listen(port,()=>{
 console.log(`Server Upload at PORT ${port}`);
});
//const databaseConfig =  require('../config/database');
//const  mongoose =  require('mongoose');
//mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/Shohan');
//console.log(mongoose);