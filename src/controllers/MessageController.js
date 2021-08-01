const { MessageModel } = require("../models/MessageModel");

const MessageController = {
  create: async (req, res) => {
    try {
      const { text, userId } = req.body;
      const message = await new MessageModel({ text, user: userId });
      await message.save();

      res.status(200).json({ id: message._id, userId: message.user, text: message.text });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getMessage: async (req, res) => {
    try {
      const { userId } = req.query;
      await MessageModel.find({ user: userId })
        .populate("user")
        .exec((err, messages) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.status(200).json(messages);
        });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  socket: async ({ type, text, user }, ws) => {
    try {
      switch (type) {
        case "message":
          const message = await new MessageModel({ text, user }).save();

          ws.send(JSON.stringify(message.text));
          break;

        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = MessageController;
