import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone:String,
    gender: String,
    age: Number

})
const UserInfo = mongoose.model('User', UserSchema);
export default UserInfo;
