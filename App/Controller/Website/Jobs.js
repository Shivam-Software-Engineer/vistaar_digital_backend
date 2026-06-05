const {addJobModel} = require("../../Model/Admin_Model/addJobModel");
const {submitApplication} = require("../../Model/Website_Model/submitApplication");


let submitApp =async (req, res)=>{
    let {id}=req.params
   
   let obj= {...req.body}
    console.log(req.file)

    if(req.file){
        if(req.file.filename){
                obj['resume']=req.file.filename
                obj['appliedFor']=id
                obj['staticPath']=req.file.destination
        }
        
    }
    try{
         let appyJob = await submitApplication.insertOne(obj); 
            
         obj = {
            status: 1,
            message: "Job applied successfully",
            
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

let viewJobs = async (req, res)=>{
    try{
        let viewJobs = await addJobModel.find({status:true});
        obj = {
            status: 1,
            message: "Jobs fetched successfully",   
            data: viewJobs
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




let singleJob =async  (req, res) => {
    let {id}=req.params
    try{
        let viewSingleJob = await addJobModel.findOne({_id:id});
        obj = {
            status: 1,
            message: "Job fetched successfully",   
            data: viewSingleJob
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


let updateCandidateStatus = async (req, res) => {
  let { id } = req.params;
  let { status } = req.body; 

  try {
    await submitApplication.updateOne(
      { _id: id },
      {
        $set: { status: status } 
      }
    );

    res.send({
      status: 1,
      message: "Candidate status updated successfully"
    });
  } catch (error) {
    res.send({
      status: 0,
      message: error.message
    });
  }
};



module.exports={submitApp, singleJob, viewJobs, updateCandidateStatus };