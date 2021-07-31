const { UserModel } = require("../models/UserModel");

const UserController = {
  create: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new UserModel({ username, password });

      const newUser = await user.save();
      res.json({
        id: newUser._id,
        message: `Пользователь ${newUser.username} был успешно создан!`,
      });
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res.status(400).json({ ...err, message: "A user with this name already exists" });
      }

      return res.status(400).json(err);
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.body;
      const user = await UserModel.findByIdAndDelete(id);
      if (user) {
        return res.status(200).json({ message: "Пользователь был удален!" });
      }
      return res.status(400).json({ message: "Пользователь не найден!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = UserController;
