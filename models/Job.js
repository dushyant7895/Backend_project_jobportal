const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    // companyName, logoUrl,jobPosition,monthlySalary,jobType,remote,location, jobDescription,
    //aboutCompany,skillsRequired, additionalInformation
    //  companyName,title, description, logoUrl,  salary, location, duration, locationType,
    // information,jobType, skills,refUserId,jobPosition,
    companyName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required:true,
    },
    jobPosition: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    locationType: {
      type: String,
      required: true,
    },
    information: {
      type: String,
    },
    jobType: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
        required: true,
      },
    ],

    refUserId: {
      type: mongoose.ObjectId,
    },
  },
  { timestamps: { createdAt: "createAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Job", jobSchema);
