const mongoose =  require('mongoose');
var UsersSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
  
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    createdAt:{
        type:String,
        required:false
  
    },
    updatedAt:{
        type:String,
        required:false
  
    }
  });
var Users =  mongoose.model('users',UsersSchema);
module.exports = {Users};