const { Schema, model } = require("mongoose");
const { hashSync } = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", { document: true }, (next) => {
  console.log(this.password);
  const hash = hashSync(this.password, 10);

  this.password = hash;
  next();
});

const UserModel = model("User", UserSchema);

module.exports = { UserModel };
