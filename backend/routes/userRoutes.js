const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createUser,
  getUserById,
  getUserProfile,
  getUsers,
  updateUser,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router
  .route("/profile")
  .get(protect, getUserProfile) 
  .put(protect, updateUserProfile);  

router
  .route("/")
  .post(createUser)  
  .get(protect, admin, getUsers);  

router
  .route("/:id")
  .get(protect, admin, getUserById)  
  .put(protect, admin, updateUser)   
  .delete(protect, admin, deleteUser);  

module.exports = router;
