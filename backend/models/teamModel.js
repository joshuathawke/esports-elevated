const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  tournaments: [{
    type: Schema.Types.ObjectId,
    ref: 'Tournament'
  }]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;