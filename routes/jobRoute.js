const express = require("express");
const router = express.Router();
const ValidateNewJob = require('../middleware/ValidateNewJob');
const VerifyToken= require('../middleware/VerifyToken');
const {getFilteredJobs, createNewJob, getJobByID,updateExistingJob,deleteJob} = require('../controllers/jobController');

router.get("/",VerifyToken, getFilteredJobs());
router.get("/:id", getJobByID());
router.post("/add",VerifyToken, ValidateNewJob, createNewJob());
router.put('/update/:id',VerifyToken, ValidateNewJob, updateExistingJob());
router.delete('/delete/:id',VerifyToken,deleteJob());

module.exports = router;


