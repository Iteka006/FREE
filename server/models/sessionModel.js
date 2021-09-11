import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, "The title is required"]
    },
    Description:{
        type: String,
        required: [true, "The Description is required"]
    },
    StartingTime: String,
    EndingTime: String,
    status: {
        type: String,
        enum:["approved", "decline", "pending"],
        default:"pending"
    },
    User:{
        type:mongoose.Schema.ObjectId, ref:'User',
        required: [true, "The Identification of the User is required"]
    },
    
    Mentor: {
        type:mongoose.Schema.ObjectId, ref:'User',
        required: [true, "The Identification of the mentor is required"]
    }

})
SessionSchema.pre(/^find/, function(next){
    this.populate({
        path:"User",
        select:"firstName lastName email phone gender"
    }).populate({
        path:"Mentor",
        select:"firstName lastName email phone gender"
    });
    next();
})
const SessionInfo = mongoose.model('Session', SessionSchema);
export default SessionInfo;
