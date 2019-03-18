const mongoose =  require('mongoose');
var ChatSchema = mongoose.Schema({
    user_id:{
        type:String,
        required:true,
    },
    message_to:{
        type:String,
        required:true
    },
    message_text:{
        type:String,
        required:true
    },
    message_type:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        required:true  
    },
    updatedAt:{
        type:String,
        required:true
    }
  });
var ChatUsers =  mongoose.model('chatusers',ChatSchema);
module.exports = {ChatUsers};