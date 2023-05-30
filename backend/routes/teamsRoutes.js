const express = require('express');
const { getTeams, createTeam } = require('../controllers/teamController');
const router = express.Router();

router.route('/').get(getTeams)
router.route('/create').post(createTeam)
// router.route('/:id').get().put().delete();

module.exports = router;