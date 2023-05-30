const mongoose = require('mongoose');
const { Schema } = mongoose;

const matchSchema = new Schema({
  tournament_id: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament'
  },
  team1_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  team2_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  start_time: {
    type: Date
  },
  end_time: {
    type: Date
  },
  winner_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;