const tableName = 'Shohan'
var databaseUrl =()=>{
    return 'mongodb://localhost:27017/'+tableName;
};
module.exports ={databaseUrl};

