import mongoose, { Schema } from "mongoose";

const botMessageschema=new Schema({
    text:{
        type:String,
        required:true

    },
    senderId:{
       type:mongoose.Schema.Types.ObjectId,
        required:true

    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    ContextId:{
       type:mongoose.Schema.Types.ObjectId,
      required:true
    },
    createdAt: {
    type: Date,
    default: Date.now,
  },

},
{ timestamps: true }
)

const Botmessage=mongoose.model("Botmessage",botMessageschema)
export default Botmessage