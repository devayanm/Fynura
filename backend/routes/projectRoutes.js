const express = require("express");
const {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
  upload,
} = require("../controllers/projectController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createProject).get(getProjects);

router
  .route("/:id")
  .delete(protect, admin, deleteProject)
  .put(protect, admin, updateProject);



router.post("/upload", upload.single("image"), (req, res) => {
  res.json({ path: req.file.path });
});

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ message: error.message });
  }

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  next();
});

router.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

module.exports = router;
