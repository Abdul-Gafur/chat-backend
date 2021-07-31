const { ChatModel } = require("../models/ChatModel");
const { MessageModel } = require("../models/MessageModel");

const ChatController = {
  create: async (req, res) => {
    try {
      const { users } = req.body;
      const chat = new ChatModel({ users });

      await chat.save();
      res.status(200).json(chat);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getChat: async (req, res) => {
    try {
      const { id } = req.query;
      await ChatModel.findById(id)
        .populate("messages")
        .exec((err, chat) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.status(200).json(chat);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const { id, text, userId } = req.body;
      const message = new MessageModel({ text, user: userId });
      await message.save();
      await ChatModel.findByIdAndUpdate(id, { $push: { messages: message } });
      res.status(200).json({ message: "Ok" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = ChatController;
