import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    Title: String,
    Description: String,
    StartingTime: Date,
    EndingTime: Date,
    Status:String,
    User: String,
    Mentor: String

})
const SessionInfo = mongoose.model('Session', SessionSchema);
export default SessionInfo;
