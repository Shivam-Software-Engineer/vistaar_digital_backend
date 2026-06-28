const { adminLoginModel } = require("../../Model/Admin_Model/adminLogin");



let adminLogin = async (req, res)=>{
    let {uname,pass}=req.body
    // console.log(req.body)
    let checkAdmin=await adminLoginModel.findOne({uname,pass})
    let obj
    
    try {
    if (!checkAdmin) {
        throw new Error("Invalid username or Password!");
    }

    res.send({
        status: 1,
        message: "Logged in!",
        id: checkAdmin._id
    });

} catch (err) {
    res.send({
        status: 0,
        message: err.message
    });
}
}

let adminCookeieCheck = async (req, res) => {
    try {
        const { id } = req.params;

        const checkId = await adminLoginModel.findById(id);

        if (!checkId) {
            return res.send({
                status: 0,
                message: "Invalid ID"
            });
        }

        res.send({
            status: 1,
            message: "Logged in!",
            data: checkId
        });

    } catch (error) {
        res.send({
            status: 0,
            message: error.message
        });
    }
};



module.exports={adminLogin, adminCookeieCheck};