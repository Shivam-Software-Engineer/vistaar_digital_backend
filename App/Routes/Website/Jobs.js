let multer=require('multer');
let express = require("express");



const { viewJobs, singleJob, submitApp } = require("../../Controller/Website/Jobs");
let jobsRoutes = express.Router();

const storage=multer.diskStorage({
    destination:function(req, file, callback){
       return callback(null, "Uploads/Resumes")
    },
    filename:function(req, file, callback){
      return  callback(null, Date.now()+file.originalname)
    }
})
const upload=multer({storage:storage})
//http://localhost:8000/wesbite/job/add

jobsRoutes.post('/submit/:id', upload.single('resume'), submitApp)
//http://localhost:8000/website/job/view

jobsRoutes.get('/view', viewJobs)

jobsRoutes.get(`/signle-job/:id`, singleJob)



module.exports={jobsRoutes};