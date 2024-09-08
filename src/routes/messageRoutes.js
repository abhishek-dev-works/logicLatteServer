const express = require('express');
const messageController = require('../controllers/messageControllers');

const router = express.Router();

router.get('/conversation', messageController.getAllMessages);
router.get('/inbox', messageController.getUserInbox);

module.exports = router;
