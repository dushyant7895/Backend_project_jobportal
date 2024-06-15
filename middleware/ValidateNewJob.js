const ValidateNewJob = (req, res, next) => {
  // companyName, logoUrl,jobPosition,monthlySalary,jobType,remote,location, jobDescription,
  //aboutCompany,skillsRequired, additionalInformation
  const {
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
   
    
  } = req.body;
const refUserId =req.refUserId;
  if (
    !companyName ||
    !title ||
    !description ||
    !logoUrl ||
    !jobPosition ||
    !salary ||
    !duration ||
    !jobType ||
    !location ||
    !information ||
    !locationType ||
    !skills ||
    !refUserId
  ) {
    res.status(400).json({
      message: "Please provide all required field",
    });
  }
  const validJobType =["Full-Time", "Part-Time","Internship"];
  const validSkills = Array.isArray(skills) && skills.every(skill => typeof skill === 'string' );
  const validMonthlySalary = typeof salary === 'number' && salary > 0;
  
  const validateJobPosition = validJobType.includes(jobType);
  const validLogoUrl = logoUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i);
  
  if(!validSkills || !validMonthlySalary || !validateJobPosition || !validLogoUrl ){
    return res.status(400).json({
        message:"Job details fields are requide or invalid"
    });
  }

  next();
};

module.exports = ValidateNewJob;
