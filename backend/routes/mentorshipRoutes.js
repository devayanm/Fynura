const express = require('express');
const { addMentorship } = require('../controllers/mentorshipController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-mentorship', protect, addMentorship);

module.exports = router;