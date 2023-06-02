const asyncHandler = require("express-async-handler");
const Tournament = require("../models/tournamentModel");

const getTournaments = asyncHandler(async (req, res) => {
  const tournaments = await Tournament.find({});
  res.json(tournaments);
});

const createTournament = asyncHandler(async (req, res) => {
  const { name, description, start_date, end_date } = req.body;
  if (!name || !description || !start_date || !end_date) {
    res.status(400);
    throw new Error("Please provide all fields");
  } else {
    const tournament = await Tournament.create({
      title,
      description,
      // game_title,
      start_date,
      end_date,
    });
    res.status(201).json(createTournament);
  }
});

const getTournamentById = asyncHandler(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);
  if (tournament) {
    res.json(tournament);
  } else {
    res.status(404);
    throw new Error("Tournament not found");
  }
  res.json(tournament);
});

const updateTournament = asyncHandler(async (req, res) => {
  const { title, description, start_date, end_date } = req.body;
  const tournament = await Tournament.findById(req.params.id);
  if (!tournament) {
    res.status(404);
    throw new Error("Tournament not found");
  }
  if (
    tournament.user &&
    tournament.user.toString() !== req.user.id.toString()
  ) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  tournament.title = title;
  tournament.description = description;
  // tournament.game_title = game_title;
  tournament.start_date = start_date;
  tournament.end_date = end_date;

  const updatedTournament = await tournament.save();
  res.json(updatedTournament);
});

const deleteTournament = asyncHandler(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);

  if (!tournament) {
    res.status(404);
    throw new Error("Tournament not found");
  }
  if (
    tournament.user &&
    tournament.user.toString() !== req.user.id.toString()
  ) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  await Tournament.deleteTournament({ _id: tournament._id });
  res.json({ message: "Tournament deleted successfully" });
});

module.exports = {
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
  getTournaments,
};
