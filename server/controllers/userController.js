import UserInfo from "../models/userModel";
import TokenAuth from "../helpers/TokenAuth";
import bcrypt from "bcrypt";
class UserController{

    static signinUser = async (req, res) => {
        
        const { email, password } = req.body;


        const user = await UserInfo.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "user not exist"

            })
        }

        if (bcrypt.compareSync(password,user.password)){
        const token = TokenAuth.tokenGenerator({
            id: user._id,
            email: user.email,
            status: user.status,
            role: user.role
        })
        return res.status(200).json({
            status: 200,
            message: "Success login",
            token:token,
            data: user
        })
    }

    }
    //function to register users /signup
    static signupUser = async(req, res)=> {

        const saltRounds=10;
        const hashPassword= bcrypt.hashSync(req.body.password,saltRounds);
        req.body.password=hashPassword;
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
    static UpdateOneUserRole = async (req,res)=>{
        const data = await UserInfo.findById(req.params.id);
        let role;
        if(data.role=="user"){
            role="mentor";
        }
        else(role="user");
        const user = await UserInfo.findByIdAndUpdate(req.params.id, {role:role});
        if (!user){
            return res.status(404).json({
                status: 404,
                message: "not found"
            })
        }
        const updateUser = await UserInfo.findById(req.params.id);
        return res.status (200).json({
            status: 200,
            message: "successfully changed",
            data: updateUser
        })
    }

    static GetAllMentors = async(req, res)=>{


     const Getall= await UserInfo.find({role:"mentor"});
             if(!Getall)
              {
            return res.status(404).json({
             status:404,
             message:"unable to find all mentors"
    })
}
    return res.status(200).json({
        status:200,
        message:"Mentors Found",
        data:Getall
})
    }

    static getOneMentor = async (req, res)=> {
        const users = await UserInfo.findById(req.params.id,{role:"mentor"});
        if (!users){
            return res.status(404).json({
                status: 404,
                message: "failed to get the mentor"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Mentor Found",
            data:users

})
    }
  
}
    
export default UserController;