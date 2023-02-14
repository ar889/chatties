const mongoose = require("mongoose");

let conversationSchema =new mongoose.Schema({
    members:[String] 
})

let Schema = mongoose.model('conversation',conversationSchema);
module.exports= Schema