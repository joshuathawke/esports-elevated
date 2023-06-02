const mongoose = require("mongoose");
const { Schema } = mongoose;

const tournamentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // game_title: {
  //   type: String,
  // },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  matches: [
    {
      type: Schema.Types.ObjectId,
      ref: "Match",
    },
  ],
});

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
