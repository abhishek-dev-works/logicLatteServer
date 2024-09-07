const express = require('express');
const router = express.Router();
const { createJob, updateJob, deleteJob } = require('../controllers/jobsControllers');

router.post('create', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
