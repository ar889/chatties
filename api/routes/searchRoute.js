const express = require("express");
const router = express.Router();
const User = require("../schemas/user");


router.post('/hit',async(req,res)=>{
const {value} = req.body
const resultUser = await User.findOne({username:value.toLowerCase()})

if(resultUser){
    res.json({success:true,resultUser})

}else{
    res.json({success:false})
}
})







module.exports = router;
