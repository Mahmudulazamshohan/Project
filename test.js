var _ = require('lodash');
var users = [
    {
        name:"Shohan 1",
        password:"123456",
        email:"mahmudulazam@gmail.com"
    },
    {
        name:"Shohan 2",
        password:"123456",
        email:"mahmudulazam@gmail.com"
    }
];
var arr = [];
users = _.uniqBy(users,'name')
          .forEach((data)=>{
          arr.push(data.name);   
         });

console.log(arr);
