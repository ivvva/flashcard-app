const { Schema, model } = require("mongoose");

const flashcardSchema = new Schema(
  {
    title: {
      type: String,
    },
    front: String,
    back: String,
  },
  {
    timestamps: true,
  }
);

const Flashcard = model("Flashcard", flashcardSchema);

module.exports = Flashcard;
