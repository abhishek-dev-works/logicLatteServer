const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsControllers');

// Define routes for skills controller
router.post("/skills", skillsController.addSkill);
router.delete("/skills/:id", skillsController.deleteSkill);
router.get("/skills/:id", skillsController.getSkillsByUserId);

module.exports = router;
