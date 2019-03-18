
const csrf  = require('csrf');

var csrf_token = ()=>{
     return;
};
var csrf_verify = ()=>{
   return "Shohan".toString();
};

module.exports = {csrf_token,csrf_verify};