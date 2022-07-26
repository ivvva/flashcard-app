const { Schema, model } = require("mongoose");

const collectionSchema = new Schema(
  {
    title: {
      type: String,
    },
    flashcardNumber: Number,
    flashcards: []
  },
  {
    timestamps: true,
  },

);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
