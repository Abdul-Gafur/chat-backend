const { Schema, model } = require("mongoose");
const { hashSync } = require("bcrypt");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: [(value) => value.length > 7, "The password must contain at least 8 characters"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const hash = hashSync(this.password, 10);

  this.password = hash;
  next();
});

const UserModel = model("User", UserSchema);

module.exports = { UserModel };
