const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const MessageModel = model("Message", MessageSchema);

module.exports = { MessageModel };
