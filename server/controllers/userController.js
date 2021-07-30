import UserInfo from "../models/userModel";
class UserController{
    //function to register users /signup
    static signupUser = async(req, res)=> {
        const user = await UserInfo.create(req.body);
        if (!user){
            return res.status(400).json({
                status: 400,
                message: "failed to register"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "sucess",
            data: user
        })
    }
    static getAllUsers = async (req, res)=> {
        const users = await UserInfo.find();
        if (!users){
            return res.status(404).json({
                status: 404,
                message: "failed to get all users"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "success",
            data:users
        })
    } 

    static getOneUser = async (req, res)=> {
        const users = await UserInfo.findById(req.params.id);
        if (!users){
            return res.status(404).json({
                status: 404,
                message: "failed to get the user"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "User Found",
            data:users

})
    }

    static UpdateOneUser = async (req, res)=> {
        const users = await UserInfo.findByIdAndUpdate(req.params.id,req.body);
       
        if (!users){
            return res.status(404).json({
                status: 404,
                message: "failed to update the user"
            })
        }
        const UpdateOneUser = await UserInfo.findById(req.params.id);
        return res.status(200).json({
            status: 200,
            message: "User Updated",
            data: UpdateOneUser

})
    }

    static DeleteOneUser = async (req, res)=> {
        const users = await UserInfo.findByIdAndDelete(req.params.id);
        if (!users){
            return res.status(404).json({
                status: 404,
                message: "failed to delete the user"
            })
        }
        
        return res.status(200).json({
            status: 200,
            message: "User Deleted",
            data:users

})
    }
}
export default UserController;