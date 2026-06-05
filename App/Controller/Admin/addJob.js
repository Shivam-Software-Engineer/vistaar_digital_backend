const {addJobModel} = require("../../Model/Admin_Model/addJobModel");


let addJob =async (req, res)=>{
   

    try{
         let addJob = await addJobModel.insertOne(req.body); 
            
         obj = {
            status: 1,
            message: "Job added successfully",
            
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
        let viewJobs = await addJobModel.find();
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

let updateJobStatus = async (req, res) => {
  let { id } = req.params;
  let { status } = req.body; 

  try {
    await addJobModel.updateOne(
      { _id: id },
      {
        $set: { status: status } 
      }
    );

    res.send({
      status: 1,
      message: "Job status updated successfully"
    });
  } catch (error) {
    res.send({
      status: 0,
      message: error.message
    });
  }
};

let deleteJob =  (req, res) => {
    let {id} = req.params
    let obj
    addJobModel.deleteOne({_id:id})
    .then((delres)=>{
        obj={
            status:1,
            message: "Deleted successfully"
        }
        res.send(obj)
    })
    .catch((err)=>{
        obj={
            status:0,
            message:err
        }
        res.send(obj)
    })

}


let editJob= async (req, res) => {
    let {id} = req.params
    let obj
    
    try{
        let updatedjob = await addJobModel.updateOne(
        {_id:id},
        {
            $set:req.body
        })
        obj={
            satus:1,
            message:"Update successfully"
        }
        res.send(obj)
    
        
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



module.exports={addJob,deleteJob, viewJobs, updateJobStatus, editJob, singleJob};