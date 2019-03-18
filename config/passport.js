const LocalStrategy =  require('passport-local').Strategy;


var {Users} = require('../models/users');
const bcrypt = require('bcryptjs');

module.exports = (passport)=>{
     passport.use(new LocalStrategy(function(username,password,done){
      
       Users.findOne({email:username},(err,user)=>{
            if(err){
                console.log(err);
            }
          
            if(!user){
                return done(null,false,{message:"User Not Found"});
            }
            bcrypt.compare(password,user.password,(err,isMatch)=>{
               
                if(err){
                    console.log(err);
                }
                if(isMatch){
                    return done(null,user);
                }else{
                    return done(null,false,
                        {
                            message:"Please enter valid password"
                        });
                }
             });
       });
     }));
    passport.serializeUser((user,done)=>{
       //  console.log(user);
       done(null,user._id);
     });
     passport.deserializeUser((id,done)=>{
    
       Users.findOne({_id:id},(err,user)=>{
        
         done(err,user);

       });
     });
    
     //console.log(passport);

};