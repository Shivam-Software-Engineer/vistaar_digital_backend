const { submitApplication } = require("../../Model/Website_Model/submitApplication");



let viewCandidate = async (req, res)=>{
    try{
        let viewUsers = await submitApplication.find().populate({
            path:"appliedFor",
            select: "_id jobTitle"
        });
        obj = {
            status: 1,
            message: "Jobs fetched successfully",   
            data: viewUsers
        }
        res.send(obj);
    }
    catch(error){
        obj = {
            status: 0,
            message: error.message
        }
        res.send(obj);
    }
}




module.exports={viewCandidate};