const express = require('express');
const { protect } = require('../middlewares/authMiddleware')
const { getTournaments, createTournament, getTournamentById, updateTournament, deleteTournament } = require('../controllers/tournamentController')

const router = express.Router();

router.route('/').get(protect, getTournaments);
router.route('/create').post(protect, createTournament);
router.route('/:id').get(getTournamentById).put(protect, updateTournament).delete(protect, deleteTournament);
module.exports = router;