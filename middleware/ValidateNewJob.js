const ValidateNewJob = (req, res, next) => {
  // companyName, logoUrl,jobPosition,monthlySalary,jobType,remote,location, jobDescription,
  //aboutCompany,skillsRequired, additionalInformation
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
    
  } = req.body;

  if (
    !companyName ||
    !logoUrl ||
    !jobPosition ||
    !monthlySalary ||
    !jobType ||
    !location ||
    !jobDescription ||
    !aboutCompany ||
    !skillsRequired
    
  ) {
    res.status(400).json({
      message: "Please provide all required field",
    });
  }
  const validJobPositions =["Full-Time", "Part-Time","Internship"];
  const validSkills = Array.isArray(skillsRequired) && skillsRequired.every(skill => typeof skill === 'string' );
  const validMonthlySalary = typeof monthlySalary === 'number' && monthlySalary > 0;
  const validRemote = typeof remote === 'boolean';
  const validateJobPosition = validJobPositions.includes(jobType);
  const validLogoUrl = logoUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i);
  console.log("Logo->",validLogoUrl);
  if(!validSkills || !validMonthlySalary || !validRemote || !validateJobPosition || !validLogoUrl ){
    return res.status(400).json({
        message:"Job details fields are requide or invalid"
    });
  }

  next();
};

module.exports = ValidateNewJob;
