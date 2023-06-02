const express = require("express");
const {
  getTeams,
  createTeam,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getTeams);
router.route("/create").post(protect, createTeam);
router
  .route("/:id")
  .get(getTeamById)
  .put(protect, updateTeam)
  .delete(protect, deleteTeam);

module.exports = router;
