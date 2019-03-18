const sharp = require('sharp');
const fs = require('fs');
const path = require('path');


module.exports = function (path,format,height,width) { 
   //Path for file
  
   
   //Initialiaze sharp function as transform
   let transform = sharp(); 
   //Format change if require
   const fileReadStream = fs.createReadStream(path);
   if(format){
    transform = transform.toFormat(format);
   }
   //Resize Width and heigth if not null
   if(width || height){
       transform = transform.resize(width,height);
   }
   //pipe reader stream as transform
   return fileReadStream.pipe(transform);
   
};