const asyncHandler = require("express-async-handler");
const Match = require("../models/matchModel");

const getMatches = asyncHandler(async (req, res) => {
  const matches = await Match.find({ userId: req.user._id });
  res.json(matches);
});

const getMatchById = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);

  if (!match) {
    res.status(404);
    throw new Error("Match not found");
  }

  res.json(match);
});

const createMatch = asyncHandler(async (req, res) => {
  const { team1, team2, start_time, end_time } = req.body;

  if (!team1 || !team2 || !start_time || !end_time) {
    res.status(400);
    throw new Error("Please enter all fields");
  } else {
    const match = new Match({
      userId: req.user._id,
      team1,
      team2,
      start_time,
      end_time,
    });

    const createdMatch = await match.save();
    res.status(201).json(createdMatch);
  }
});

const updateMatch = asyncHandler(async (req, res) => {
  const { team1, team2, start_time, end_time } = req.body;
  const match = await Match.findById(req.params.id);
  if (!match) {
    res.status(404);
    throw new Error("Match not found");
  }
  if (match.user && match.user._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
  match.team1 = team1;
  match.team2 = team2;
  match.start_time = start_time;
  match.end_time = end_time;

  const updatedMatch = await match.save();
  res.json(updatedMatch);
});

const deleteMatch = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);
  if (!match) {
    res.status(404);
    throw new Error("Match not found");
  }
  if (match.user && match.user._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await Match.deleteOne({ _id: req.params.id });
  res.json({ message: "Match deleted" });
});

module.exports = {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
};
