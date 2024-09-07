const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  responsibilities: {
    type: [String],
    required: true,
  },
  apply: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  experience: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  salary: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming there's a User model for referencing who created the job
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
