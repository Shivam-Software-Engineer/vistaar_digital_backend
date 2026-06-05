let express = require("express");
const { adminLogin,adminCookeieCheck } = require("../../Controller/Admin/adminLogin");
let multer=require('multer')

let adminAuthRoutes = express.Router();
const upload=multer()
//http://localhost:8000/admin/job/add

adminAuthRoutes.post('/login',upload.none(), adminLogin)
adminAuthRoutes.get('/login/:id', adminCookeieCheck)


module.exports={adminAuthRoutes};