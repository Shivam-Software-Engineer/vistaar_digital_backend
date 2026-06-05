let express = require("express");

let {updateJobStatus, deleteJob, addJob, viewJobs, editJob, singleJob} = require("../../Controller/Admin/addJob");
let addJobRoutes = express.Router();

//http://localhost:8000/admin/job/add
addJobRoutes.post('/add', addJob)

addJobRoutes.get('/view', viewJobs)

addJobRoutes.put(`/update/:id`, updateJobStatus)

addJobRoutes.delete(`/delete/:id`, deleteJob)

addJobRoutes.put(`/edit-job/:id`, editJob)

addJobRoutes.get(`/signle-job/:id`, singleJob)

module.exports={addJobRoutes};