const express = require("express");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");

// @route       GET api/messages
// @desc        get all user messages
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      user: req.user.id,
    }).sort({
      date: -1,
    });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route       GET api/messages/all
// @desc        get all messages
// @access      Private
router.get("/all", auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({
      date: -1,
    });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route       GET api/messages/sendername/:id
// @desc        get the name of the user who wrote the message
// @access      Private
router.get("/sendername/:id", auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    const senderId = message.user;
    const user = await User.findById(senderId);
    res.json(user.name);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route       Post api/messages
// @desc        Add new message
// @access      Private
router.post(
  "/",
  [auth, [check("body", "body is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        errors: errors.array(),
      });
    const user = await User.findById(req.user.id);
    const username = user.name;
    const { body } = req.body;
    try {
      const newMessage = new Message({
        body,
        user: req.user.id,
        username,
      });
      const message = await newMessage.save();
      res.json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route       PUT api/messages/:id
// @desc        Update message
// @access      Private
router.put("/:id", auth, async (req, res) => {
  const { body } = req.body;

  //build message object
  const messageFields = {};
  if (body) messageFields.body = body;
  try {
    let message = await Message.findById(req.params.id);
    if (!message)
      return res.status(404).json({
        msg: "contact not found",
      });

    // Make sure user owns message
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: "not auth",
      });
    }

    message = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: messageFields },
      { new: true }
    );
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route       PUT api/messages/reply/:id
// @desc        add reply for the message
// @access      Private
router.put("/reply/:id", auth, async (req, res) => {
  const { username, body } = req.body;

  //build message object
  const replyFields = {};
  if (body) replyFields.body = body;
  if (username) replyFields.username = username;
  try {
    let message = await Message.findById(req.params.id);
    if (!message)
      return res.status(404).json({
        msg: "contact not found",
      });

    message = await Message.findByIdAndUpdate(req.params.id, {
      $push: {
        comments: replyFields,
      },
    });
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route       Delete api/messages/:id
// @desc        Delete message
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);
    if (!message)
      return res.status(404).json({
        msg: "message not found",
      });

    // Make sure user owns contact
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: "not auth",
      });
    }

    await Message.findByIdAndRemove(req.params.id);

    res.json({
      msg: "message removed",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
