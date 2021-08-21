import SessionInfo from "../models/sessionModel";
class SessionController{
    //function to register users /signup
    static SessionDetails = async(req, res)=> {
       console.log(req.user);
        req.body.User=req.user.id;

        const user = await SessionInfo.create(req.body);
        if (!user){
            return res.status(400).json({
                status: 400,
                message: "failed to create Session"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Session created",
            data: user
        })
    }
    static getAllSessionDetails = async (req, res)=> {
        
        console.log(req.user);
        const users = await SessionInfo.find({User:req.user.id});
        if (!users){
            return res.status(404).json({
                status: 404,
                message: "failed to get all Sessions"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "success",
            data:users
        })
    } 

    static getOneSession = async (req, res)=> {
        const users = await SessionInfo.findById(req.params.id);
        if (!users){
            return res.status(404).json({
                status: 404,
                message: "failed to provide Session details"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Session Successfully Found",
            data:users

})
    }

    static UpdateOneSession = async (req, res)=> {
        const users = await SessionInfo.findByIdAndUpdate(req.params.id,req.body);
       
        if (!users){
            return res.status(404).json({
                status: 404,
                message: "failed to update the Session"
            })
        }
        const UpdateOneSession = await SessionInfo.findById(req.params.id);
        return res.status(200).json({
            status: 200,
            message: "Session Updated",
            data: UpdateOneSession

})
    }

    static DeleteOneSession = async (req, res)=> {
        const users = await SessionInfo.findByIdAndDelete(req.params.id);
        if (!users){
            return res.status(404).json({
                status: 404,
                message: "failed to delete the session"
            })
        }
        
        return res.status(200).json({
            status: 200,
            message: "Session Deleted",
            data:users

})
    }
    static updateSessionStatusApproved= async(req,res)=>{
        const finf = await SessionInfo.findById(req.params.id);
        let status;
        if (finf.status=="pending"){
            status="approved";
        }
    else{
        status="pending";
    }
    const update = await SessionInfo.findByIdAndUpdate(req.params.id,{status:status});
    if(!update){
        return res.status(404).json({
            status:404,
            message:"not changed"
        })
    }
    const updated = await SessionInfo.findById(req.params.id);
    return res.status(200).json({
        status:200,
        message:"success",
        data:updated
    })
}

static updateSessionStatusDecline = async(req,res)=>{
    const finf = await SessionInfo.findById(req.params.id);
    let status;
    if(finf.status=="pending"){
        status = "decline";
    }
    else{
        status="pending";
    }
    const update = await SessionInfo.findByIdAndUpdate(req.params.id,{status:status});

    if (!update){
        return res.status(404).json({
            status: 404,
            message:"not changed"
        })
    }
    const updated = await SessionInfo.findById(req.params.id);
    return res.status(200).json({
        status:200,
        message:"success",
        data:updated
    })
}

}
export default SessionController;