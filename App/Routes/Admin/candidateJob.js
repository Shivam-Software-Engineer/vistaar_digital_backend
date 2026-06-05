let express = require("express");
const { viewCandidate } = require("../../Controller/Admin/candidate");
const { updateCandidateStatus } = require("../../Controller/Website/Jobs");


let candidateRoutes = express.Router();

//http://localhost:8000/admin/job/add

candidateRoutes.get('/view', viewCandidate)

candidateRoutes.put(`/update/:id`, updateCandidateStatus)

module.exports={candidateRoutes};