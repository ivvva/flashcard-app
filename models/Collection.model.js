const { Schema, model } = require("mongoose");
const { flashcardSchema } = require("./Flashcard.model")

const collectionSchema = new Schema(
  {
    title: {
      type: String,
    },
    flashcardNumber: { type: Number, default: 0 },
    flashcards: [{ type: flashcardSchema, ref: "Flashcard", default: [] }]
  },
  {
    timestamps: true,
  },

);

const Collection = model("Collection", collectionSchema);

module.exports = { Collection, collectionSchema };
