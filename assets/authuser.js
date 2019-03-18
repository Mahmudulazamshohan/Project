const fs = require('fs');

module.exports  = class Authuser{

    constructor(req){
     this._request  = req;
     
    }
    
    getID(){
        return this._request.user.id; 
    }
    getName(){
       return this._request.user.name;
    }
    getPassword(){
       return this._request.user.password;
      
    }
    getEmail(){
       return this._request.user.email;       
    }
    getCreatedTime(){
      return this._request.user.createdAt;
      
    }
    getUpdatedTime(){
     return this._request.user.updatedAt;
    }


}
