import mongoose from "mongoose";

const messageseen=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message",
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message",
        required:true
    },
    isSeen:{
        type:Boolean
    },
    timestamp:{
         type: Date,
        default: Date.now 
    }
})

const seenMessage=mongoose.model('seenMessage',messageseen)
export default seenMessage