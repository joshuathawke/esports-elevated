const asyncHandler = require('express-async-handler');
const Team = require('../models/teamModel');


const getTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find({user: req.user._id});
    res.json(teams);
});

const createTeam = asyncHandler(async (req, res) => {
    const { name, city, country } = req.body;

    if (!name || !city || !country) {
        res.status(400);
        throw new Error('Please enter all fields');
    }
    else {
        const team = new Team({ user: req.user._id, name, city, country });

        const createdTeam = await team.save();
        res.status(201).json(createdTeam);
    }
});
module.exports = {getTeams, createTeam}