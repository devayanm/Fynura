const express = require("express");
const {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createProject).get(getProjects);

router
  .route("/:id")
  .delete(protect, admin, deleteProject)
  .put(protect, admin, updateProject);

module.exports = router;
