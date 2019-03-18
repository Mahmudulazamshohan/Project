const databaseConfig =  require('../../config/database');
const  mongoose =  require('mongoose');
mongoose.Promise = global.Promise;
//Connect with data url
mongoose.connect(databaseConfig.databaseUrl().toString());
module.exports = {mongoose};