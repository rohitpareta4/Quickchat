import mongoose from "mongoose";

const messageschema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"User",
        required:true
    },
    text:{
        type:String,
    },
    Image:{
        type:String
    }
},
{timestamps:true}
)

const Message=mongoose.model("message",messageschema)
export default Message