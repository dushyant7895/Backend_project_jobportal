const express = require("express");
const router = express.Router();
const Job = require("./../models/Job");
const ValidateNewJob = require('../middleware/ValidateNewJob');

router.get("/", getFilteredJobs());

router.post("/add",ValidateNewJob, async (req, res,next) => {
  try {
    
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
  } catch (error) {
    next({
      message:"Error occurr when add new job",
      error
    });
  }
});

router.get("/:id", async (req, res,next) => {
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
    next({
      message:"Error occurr when seaching the job id",
      error
    });
  }
  
});

module.exports = router;

//filter the jobs
function getFilteredJobs(){
  return async (req, res,next) => {
    try{
    const {minSalary, maxSalary, jobType, location,remote,skills} = req.query;
    console.log(minSalary,maxSalary,jobType, location,remote);
    const skillsArray = skills ? skills.split(',') : [];
    const jobs = await Job.find(
      {
        monthlySalary: {
          $gte: minSalary || 0,
          $lte: maxSalary || 9999999
        },
        jobType: jobType || { $exists:true},
        location: location || {$exists:true},
        remote: remote=="true" || {$exists:true},
      });
  
      // find the job on the basis of the skills we can handle this by mongoose later
      const finalJobs = jobs.filter(job=>{
        let isSkillMatched = true;
        if(skillsArray.length > 0)
          {
            isSkillMatched = skillsArray.every(skill => job.skillsRequired.includes(skill));
          }
          return isSkillMatched;
      });
  
    res.status(200).json({
      message: "Job route working fine",
      status: "working",
      finaljobss: finalJobs,
    });
  }catch(error){
    next({
      message:"Error when apply filter on job",
      error
    });
  }
  }
}
