const router = require("express").Router();
const Message = require("../schemas/messages");
const Conversation = require("../schemas/conversation");
const jwt = require("jsonwebtoken");

// recieve message from client
router.post("/post", async (req, res) => {
  // Authenticating
  const cookie = req.cookies;
  if (cookie.token) {
    let senderId = "";
    let data = jwt.verify(req.cookies.token, process.env.SECRET);
    senderId = data.userId;

    let { recieverId, message,conversationId } = req.body;
    // check for availability in conversation
    if (!conversationId) {
      const conversation = await Conversation.findOne({
        members: {
          $all: [recieverId, senderId],
        },
      });
      if (conversation) {
        conversationId = conversation.id;
      } else {
        const addConversation = await Conversation.create({
          members: [senderId, recieverId],
        });
        addConversation.save();
        conversationId = addConversation.id;
      }
    }
    // inserting message to database
    const messageObject = await Message.findOne({ conversationId });
    if (messageObject) {
      await messageObject.messages.push({ senderId, message });
      messageObject.save();
      res.send("message added");
    } else {
      const newMessageObject = await Message.create({
        conversationId,
        messages: { senderId, message },
      });
      newMessageObject.save();
      res.send("new message object created");
    }
  } else {
    res.json({ login: false });
  }
});

// send messages to client side
router.post("/fetch", async (req, res) => {
  // getting recieverId
  let senderId = "";
  let {conversationId} = req.body;
  let data = jwt.verify(req.cookies.token, process.env.SECRET);
  senderId = data.userId;
  // finding conversation to get conversation id
  const conversation = await Conversation.findOne({
    members: {
      $all: [conversationId, senderId],
    },
  });
if(conversation){
  const convId = conversation.id;
  const messageData = await Message.findOne({ conversationId:convId });
  if (messageData) {
    res.status(200).json(messageData);
  } else {
    res.status(200).json({ success: false, messages: false });
  }

}else{
  res.status(200).json({ success: false, messages: false });

}
});

module.exports = router;
