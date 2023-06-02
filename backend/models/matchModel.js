const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
  team1: {
    type: String,
  },
  team2: {
    type: String,
  },
  start_time: {
    type: Date,
  },
  end_time: {
    type: Date,
  },
  // created_at: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updated_at: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
