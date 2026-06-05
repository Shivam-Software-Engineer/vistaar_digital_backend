let multer=require('multer');
let express = require("express");



const { viewJobs, singleJob, submitApp } = require("../../Controller/Website/Jobs");
const upload = require('../../Configurations/multer');
let jobsRoutes = express.Router();


//http://localhost:8000/wesbite/job/add

jobsRoutes.post('/submit/:id', upload.single('resume'), submitApp)
//http://localhost:8000/website/job/view

jobsRoutes.get('/view', viewJobs)

jobsRoutes.get(`/signle-job/:id`, singleJob)



module.exports={jobsRoutes};