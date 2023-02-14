const mongoose = require("mongoose");
let userSchema =new mongoose.Schema({
username:{type:String,unique:true},
profilePic:String,
password:String
})

let Schema = mongoose.model('user',userSchema);
module.exports= Schema