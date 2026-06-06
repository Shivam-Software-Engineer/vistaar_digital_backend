const { submitApplication } = require("../../Model/Website_Model/submitApplication");



let viewCandidate = async (req, res) => {
    try {
        let { username } = req.query;

        let query = {};

        // sirf username search
        if (username) {
            query.username = {
                $regex: username,
                $options: "i"
            };
        }

        let viewUsers = await submitApplication
            .find(query)
            .populate({
                path: "appliedFor",
                select: "_id jobTitle"
            });

        res.send({
            status: 1,
            message: "Candidates fetched successfully",
            data: viewUsers
        });

    } catch (error) {
        res.send({
            status: 0,
            message: error.message
        });
    }
};




module.exports={viewCandidate};