const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect("mongodb://PrakharPandey:PakharPandey31@ac-w8e6jsd-shard-00-00.qjcbvbz.mongodb.net:27017,ac-w8e6jsd-shard-00-01.qjcbvbz.mongodb.net:27017,ac-w8e6jsd-shard-00-02.qjcbvbz.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-kmdxnh-shard-0&authSource=admin&appName=PakharNode/devTinder",)
};
module.exports = connectDB;


 