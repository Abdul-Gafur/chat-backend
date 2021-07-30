const { UserModel } = require("../models/UserModel");

const UserController = {
  create: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new UserModel({ username, password });

      if (password.length < 8) {
        throw new Error("Пароль должен содержать минимум 8 символов!");
      }

      const newUser = await user.save();
      res.json({
        id: newUser._id,
        message: `Пользователь ${newUser.username} был успешно создан!`,
      });
    } catch (err) {
      if (err.name === "MongoError") {
        return res
          .status(400)
          .json({ ...err, message: "Пользователь с таким именем уже сущесвует!" });
      }

      const { message } = err;
      return res.status(400).json({ message });
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
