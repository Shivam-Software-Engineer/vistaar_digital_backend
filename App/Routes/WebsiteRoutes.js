
let express = require("express");
const { jobsRoutes } = require("./Website/Jobs");

let websiteRoutes=express.Router();

//http://localhost:8000/website/job
websiteRoutes.use('/job', jobsRoutes)


module.exports={websiteRoutes};