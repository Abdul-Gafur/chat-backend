const { UserModel } = require("../models/UserModel");

const UserController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new UserModel({ username, password });
      const newUser = await user.save();
      res.json({ message: `Пользователь ${newUser.username} был успешно создан!` });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = UserController;
