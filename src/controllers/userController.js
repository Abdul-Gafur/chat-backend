const { UserModel } = require("../models/UserModel");
const { createToken } = require("../utils");
const { compareSync } = require("bcrypt");

const UserController = {
  create: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new UserModel({ username, password });

      await user.save();
      res.json({
        id: user._id,
        message: `Ok`,
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
        return res.status(200).json({ message: "Ok" });
      }
      return res.status(400).json({ message: "The user was not found" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      const isCorrectPassword = await compareSync(password, user.password);
      if (!isCorrectPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = createToken(user);
      res.status(200).json({
        username: user.username,
        token,
        expiresIn: process.env.JWT_EXPIRATION_DELTA,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = UserController;
