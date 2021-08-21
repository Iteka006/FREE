import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first-name is required"]
    },
    lastName: {
        type: String,
    required: [true, "last-name is required"]
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        default:"12345678"
    },
    phone:String,
    gender: {
        type: String,
        enum: ["male" , "female"]
    },
    age: Number,
    role:{
        type: String,
        enum:["admin", "mentor", "user"],
        default:"user"
    }

})
const UserInfo = mongoose.model('User', UserSchema);
export default UserInfo;
