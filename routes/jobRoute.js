const express = require("express");
const router = express.Router();
const Job = require("./../models/Job");
const ValidateNewJob = require('../middleware/ValidateNewJob');

router.get("/", async (req, res) => {
  const {minSalary, maxSalary, jobType, location,remote} = req.query;
  console.log(minSalary,maxSalary,jobType, location,remote);
  const jobs = await Job.find(
    {
      monthlySalary: {
        $gte: minSalary || 0,
        $lte: maxSalary || 9999999
      },
      jobType: jobType || { $exists:true},
      location: location || {$exists:true},
      remote: remote=="true" || {$exists:true}
    }
  );
  res.status(200).json({
    message: "Job route working fine",
    status: "working",
    jobs: jobs,
  });
});

router.post("/add",ValidateNewJob, async (req, res) => {
  const {
    companyName,
    logoUrl,
    jobPosition,
    monthlySalary,
    jobType,
    remote,
    location,
    jobDescription,
    aboutCompany,
    skillsRequired,
    additionalInformation,
    author,
  } = req.body;

  const newJobs = new Job({
    companyName,
    logoUrl,
    jobPosition,
    monthlySalary,
    jobType,
    remote,
    location,
    jobDescription,
    aboutCompany,
    skillsRequired,
    additionalInformation,
    author,
  });

  await newJobs.save();
  res.status(201).json({
    success: true,
    message: "New Job created successfully",
    jobId: newJobs._id,
  });
});

router.get("/:id", async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await Job.findById(jobId);
  if (job) {
    res.status(302).json({
      message: "Job Found",
      job: Job,
    });
  }
  } catch (error) {
    res.status(404).json({
        message:"Job not found"
    });
  }
  
});

module.exports = router;
