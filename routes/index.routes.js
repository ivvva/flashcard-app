const { default: mongoose } = require("mongoose");
const { Flashcard } = require("../models/Flashcard.model");
const User = require("../models/User.model");
const { Collection } = require("../models/Collection.model");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/user/:userId/myCollections", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("collections");
    res.json({ collections: user.collections });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get(
  "/user/:userId/collection/:collectionId/training",
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { collectionId } = req.params;
      console.log(req.params);
      const currCollection = await Collection.findById(collectionId);
      res.json({ flashcards: currCollection.flashcards });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post("/user/:userId/newCollection", async (req, res) => {
  try {
    const { userId } = req.params;
    const { title } = req.body;

    if (!title) {
      res.status(400).json({ message: "Collection needs a title!" });
      return;
    }
    const newCollection = await Collection.create({
      title,
    });

    await User.findByIdAndUpdate(userId, {
      $push: {
        collections: { _id: newCollection._id },
      },
    });
    res.status(201).json(newCollection);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post(
  "/user/:userId/collection/:newCollectionId/newFlashard",
  async (req, res) => {
    try {
      const { title, front, back, newCollectionId } = req.body;
      const { userId } = req.params;

      if (title === "" || front === "" || back === "") {
        res.status(400).json({ message: "Please fill all fields!" });
        return;
      }

      const newFlashcard = await Flashcard.create({
        title,
        front,
        back,
      });
      console.log({ newFlashcard });
      const coll = await Collection.findByIdAndUpdate(newCollectionId, {
        $push: { flashcards: { ...newFlashcard } },
        $inc: { flashcardNumber: 1 },
      });

      User.findByIdAndUpdate(userId, {
        $push: { collections: coll._id },
      });
      res.status(201).json(newFlashcard);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
