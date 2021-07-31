const { Schema, model } = require("mongoose");

const ChatSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const ChatModel = model("Chat", ChatSchema);

module.exports = { ChatModel };
