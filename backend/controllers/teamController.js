const asyncHandler = require("express-async-handler");
const Team = require("../models/teamModel");

const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find({ user: req.user._id });
  res.json(teams);
});

const createTeam = asyncHandler(async (req, res) => {
  const { name, city, country } = req.body;

  if (!name || !city || !country) {
    res.status(400);
    throw new Error("Please enter all fields");
  } else {
    const team = new Team({ user: req.user._id, name, city, country });

    const createdTeam = await team.save();
    res.status(201).json(createdTeam);
  }
});

const getTeamById = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (team) {
    res.json(team);
  } else {
    res.status(404).json({ message: "Team not found" });
  }
});

const updateTeam = asyncHandler(async (req, res) => {
  const { name, city, country } = req.body;
  const team = await Team.findById(req.params.id);

  if (!team) {
    res.status(404);
    throw new Error("Team not found");
  }

  if (team.user && team.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  team.name = name;
  team.city = city;
  team.country = country;

  const updatedTeam = await team.save();
  res.json(updatedTeam);
});

const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    res.status(404);
    throw new Error("Team not found");
  }

  if (team.user && team.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Team.deleteOne({ _id: team._id });
  res.json({ message: "Team removed" });
});

module.exports = { getTeams, createTeam, getTeamById, updateTeam, deleteTeam };
