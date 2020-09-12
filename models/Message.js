const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gusers",
  },
  body: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gusers",
      },
      body: String,
      date: Date,
    },
  ],
});

module.exports = mongoose.model("message", MessageSchema);
