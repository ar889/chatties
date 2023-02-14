const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const upload = require('../multer/multerSetup')
const jwt = require("jsonwebtoken");

// Route for sign up

router.get('/success',(req,res)=>{
  const cookie = req.cookies
  if(cookie.token){
    let data = jwt.verify(req.cookies.token,process.env.SECRET)
        res.json({login:true,token:data})
  }else{
    res.json({login:false})
  }
})


router.post("/signup", upload.single('profilePic'),async (req, res) => {
  let { username,password } = req.body;
  username=username.toLowerCase()
  const profilePic = req.file.filename
  const CheckInDB = await User.findOne({ username: username });
  if (CheckInDB) {
    res.json({ message: "user already exists", success: false });
  } else {
    const newUser = await User.create({
      username,
      profilePic,
      password,
    });
    newUser.save();
    const token = jwt.sign({ userId: newUser.id, username: username,profilePic:newUser.profilePic }, process.env.SECRET);
    res.cookie("token", token);
    res.json({ message: "Signed up successfully", success: true });
  }
});

// Route for log in
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  console.log(user)

  if (user) {
    if (user.password == password) {
      const token = jwt.sign(
        { userId: user._id, username: user.username,profilePic:user.profilePic },
        process.env.SECRET
      );
      res.cookie("token", token);
      res.json({ success: true, message: "You are successfully logged in" });
    } else {
      res.json({ success: false, message: "Your password is incorrect" });
    }
  } else {
    res.json({ success: false, message: "Your Account does not exist" });
  }
});

router.get('/logout',(req,res)=>{
  res.clearCookie('token');
   res.send('Successful');
})


module.exports = router;
