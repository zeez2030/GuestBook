const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gusers",
  },
  username: String,
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
      username: String,
      body: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("message", MessageSchema);
