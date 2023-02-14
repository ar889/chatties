const router = require("express").Router();
const Conversation = require("../schemas/conversation");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

// create new conversation
router.get("/get", async (req, res) => {
  const cookie = req.cookies;
  const conversationFilterArray = [];
  const conversationArray = [];

  if (cookie.token) {
    // verify user
    let data = jwt.verify(req.cookies.token, process.env.SECRET);
    const conversation = await Conversation.find({
      members: {
        $in: [data.userId],
      },
    });
    // filtering ids to get id of second user
    for (const item in conversation) {
      const filter = await conversation[item].members.filter(
        (item) => item != data.userId
      );
      conversationFilterArray.push(filter.toString());
    }
    // getting Users data by id for conversation
    for (const id of conversationFilterArray) {
      const user = await User.findById(id);
      conversationArray.push(user);
    }
    res.json(conversationArray);
  } else {
    res.json({ conversation: false });
  }
});
module.exports = router;
