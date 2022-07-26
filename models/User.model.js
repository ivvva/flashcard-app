const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: String,
    email: String,
    collections: []
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
