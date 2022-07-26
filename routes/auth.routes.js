const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const User = require("../models/User.model");
const Flashcard = require("../models/Flashcard.model");
const Collection = require("../models/Collection.model");
const res = require("express/lib/response");

router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;
  console.log({ body: req.body });
  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
  if (password.length < 4) {
    res.status(400).json({ message: "Password has to be 4 chars min" });
    return;
  }
  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // hash the password
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    let collections = []
    // create the new user

    return User.create({ email, password: hashedPassword, name, collections: collections })
      .then((createdUser) => {
        const { email, name, _id, collections } = createdUser;
        const user = { email, name, _id, collections };
        console.log(createdUser)
        res.status(201).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  });
});

router.get("/:userId/myCollections", (req, res) => {
  const { userId } = req.params
  console.log({ userId})
  res.json({})
})



router.post("/:userId/newCollection", (req, res) => {
  const { userId } = req.params
  console.log({ userId })
  const { title } = req.body;
  console.log({body: req.body })

  if (!title) {
    res.status(400).json({ message: "Collection needs a title!" });
    return;
  }
  return Collection.create({ title, flashcardNumber: 0, flashcards: [] })
  .then((createdCollection) => {
      const { title, flashcardNumber, flashcards, _id, userId } = createdCollection;
      const newCollection = { title, flashcardNumber, flashcards, _id };
      const newCollectionId = newCollection._id.toString();
      res.status(201).json(newCollection);
      User.findByIdAndUpdate(
        "62dfc9e23bf207ea4ab5bf75",
        {
          $push: { collections: { title: title, flashcardNumber: flashcardNumber, flashcards: flashcards } },
        },

        { safe: true, upsert: true },
        function (err, model) {
          console.log(err);
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post("/newFlashard", (req, res) => {
  const { title, front, back, newCollectionId } = req.body;
  if (title === "" || front === "" || back === "") {
    res.status(400).json({ message: "Please fill all fields!" });
    return;
  }
  return Flashcard.create({ title, front, back })
    .then((createdFlashcard) => {
      const { title, front, back, _id } = createdFlashcard;
      const flashcard = { title, front, back, _id, newCollectionId };
      Collection.findByIdAndUpdate(
        newCollectionId,
        {
          $push: { flashcards: { title: title, front: front, back: back } },
          $inc: { flashcardNumber: 1 },
        },

        { safe: true, upsert: true },
        function (err, model) {
          console.log(err);
        }
      );
      res.status(201).json(flashcard);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        console.log("bru");
        res.status(400).json({ message: "User not found" });
        return;
      }
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      if (passwordCorrect) {
        const { _id, email, name } = foundUser;
        const payload = { _id, email, name };
        const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
          algorithm: "HS256",
          expiresIn: "12h",
        });
        res.status(200).json({ authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

module.exports = router;
