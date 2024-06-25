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
  const validLocationTypes =["On-site","Remote","Hybrid"];
  const validateJobPosition = validJobType.includes(jobType);
  const validLogoUrl = logoUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i);
  const validLocationType = validLocationTypes.includes(locationType);
 
  if(!validLogoUrl){
    return res.status(400).json({
      message:"Error in logo_url please correct it "
    });
  }
  if(!validateJobPosition){
    return res.status(400).json({
      message:"Error in job position please coorect it"
    });
  }
  if(!validMonthlySalary){
    return res.status(400).json({
      message:"Error in salary please coorect it"
    });
  }
  if(!validSkills){
    return res.status(400).json({
      message:"Error in Skills please correct it"
    });
  }
  if(!validLocationType)
    {
      return res.status(400).json({
        message:"Error in location type please correct it"
      });
    }

  next();
};

module.exports = ValidateNewJob;
