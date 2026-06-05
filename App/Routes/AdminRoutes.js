let {addJobRoutes} = require("./Admin/addJob");
let express = require("express");
const { candidateRoutes } = require("./Admin/candidateJob");
const { adminAuthRoutes } = require("./Admin/authAdmin");

let adminRoutes=express.Router();

//http://localhost:8000/admin/job
adminRoutes.use('/job', addJobRoutes)
adminRoutes.use('/candidate', candidateRoutes)
adminRoutes.use('/auth', adminAuthRoutes)

module.exports={adminRoutes};