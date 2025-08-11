import mongoose from "mongoose";

const schedulemssgschema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    scheduleMssg:{
        type:String,
        required:true
    },
    scheduletime: {
    type: Date, // ✅ changed from String to Date
    required: true,
  },
})

const scheduleschema=mongoose.model('scheduleschema',schedulemssgschema)
export default scheduleschema