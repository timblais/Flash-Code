const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    ref: "User",
    require: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
    require: true,
  },

  title: {
    type: String,
    require: true,
  },

  dueDate: {
    type: Date,
    default: Date.now,
    require: true,
  },

  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    require: true,
  },

  question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },

  repetitionNumber: {
    type: Number,
    default: 0,
    require: true,
  },

  easinessFactor: {
    type: Number,
    default: 2.5,
    require: true,
  },

  repetitionInterval: {
    type: Number,
    default: 1,
    require: true,
  },

  totalViews: {
    type: Number,
    default: 0,
    require: true,
  },

  language: {
    type: String,
    default: 'plaintext',
    require: true,
  }

});

module.exports = mongoose.model("Card", CardSchema);