const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getMatches, getMatchById, createMatch, updateMatch, deleteMatch} = require('../controllers/matchController');
const router = express.Router();

router.route('/').get(protect, getMatches)
router.route('/create').post(protect, createMatch);
router.route('/:id').get(getMatchById).put(protect, updateMatch).delete(protect, deleteMatch);

module.exports = router;