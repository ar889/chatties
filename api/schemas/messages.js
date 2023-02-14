const mongoose = require("mongoose");

let messageSchema = new mongoose.Schema(
  {
    conversationId: String,
    messages: [
      {
        senderId: String,
        message: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

let Schema = mongoose.model("message", messageSchema);
module.exports = Schema;
