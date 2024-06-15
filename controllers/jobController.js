const Job = require("../models/Job");;


//new Job Creating
function createNewJob() {
    return async (req, res, next) => {
      try {
  
        const {
          companyName,title,description, logoUrl, jobPosition, salary, jobType, location ,duration, locationType, information, skills} = req.body;
          
          const refUserId=req.refUserId;
        const newJobs = new Job({
          companyName,title,description, logoUrl, jobPosition, salary, jobType, location ,duration, locationType, information, skills, refUserId});
  
        await newJobs.save();
        res.status(201).json({
          success: true,
          message: "New Job created successfully",
          jobId: newJobs._id,
        });
      } catch (error) {
        next({
          message: "Error occurr when add new job",
          error
        });
      }
    };
  }
  
  //get job by id
  function getJobByID() {
    return async (req, res, next) => {
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
          message: "Error occurr when seaching the job id",
          error
        });
      }
  
    };
  }
  
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
  function updateExistingJob(){
    return async (req, res) => {
      try {
          const jobID = req.params.id;
          const { companyName, title, description, logoUrl, jobPosition, salary, location, duration, locationType, information, jobType, skills } = req.body;
          const refUserId = req.refUserId;
          const updatedJob = await Job.findByIdAndUpdate(jobID, {
              companyName,
              title,
              description,
              logoUrl,
              jobPosition,
              salary,
              location,
              duration,
              locationType,
              information,
              jobType,
              skills,
              refUserId
          });

          res.status(200).json({
              message: 'Job updated successfully',
              job: updatedJob
          });
      } catch (error) {
          next("Error Updating Job", error);
      }
  };
  }

  function deleteJob() {
    return async (req, res) => {
        try {
            const jobID = req.params.id;
            await Job.findByIdAndDelete(jobID);
            res.status(200).json({
                message: 'Job deleted successfully',
                success:true
            });
        } catch (error) {
            next("Error Deleting Job", error);
        }
    };
}



  module.exports={getJobByID, createNewJob, getFilteredJobs,updateExistingJob,deleteJob};