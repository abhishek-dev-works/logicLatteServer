const Job = require("../models/job");

// Method to create a job
const createJob = async (req, res) => {
  try {
    const newJob = new Job({
      ...req.body,
      createdBy: req.user_id,
    });

    const savedJob = await newJob.save();
    res
      .status(201)
      .json({ message: "Job created successfully", job: savedJob });
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
};

// Method to update a job
const updateJob = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
};

// Method to delete a job
const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res
      .status(200)
      .json({ message: "Job deleted successfully", job: deletedJob });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};

// Method to get all jobs
const getAllJobs = async (req, res) => {
  const userId = req.user_id; // Assuming `req.user` contains the authenticated user's ID
  try {
    const jobs = await Job.find(); // Fetch all jobs from the database
    const jobsWithAuthInfo = jobs.map((job) => ({
      ...job.toObject(), // Convert the mongoose document to a plain object
      isAuthor: job.createdBy.toString() === userId.toString(), // Check if the user is the author
    }));

    res.status(200).json({ jobs: jobsWithAuthInfo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

// Method to get a job by its ID
const getJobById = async (req, res) => {
  const { id } = req.params; // Job ID from the URL
  const userId = req.user_id; // Authenticated user's ID

  try {
    const job = await Job.findById(id); // Find the job by its ID

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const jobWithAuthInfo = {
      ...job.toObject(), // Convert the mongoose document to a plain object
      isAuthor: job.createdBy.toString() === userId.toString(), // Check if the user is the author
    };

    res.status(200).json({ job: jobWithAuthInfo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById,
};
