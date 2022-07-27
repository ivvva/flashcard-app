const { Schema, model } = require("mongoose");
const { collectionSchema } = require("./Collection.model");
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: String,
    email: String,
    // collections: [collectionSchema]
    collections: [
      { type: Schema.Types.ObjectId, ref: "Collection", default: [] },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
