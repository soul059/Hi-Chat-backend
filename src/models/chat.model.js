import mongoose from "mongoose"

const ChatSchma = mongoose.Schema({
    
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room",
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    text: { 
        type: String,
    },
    ownerName:{
        type:String
    }

},{
    timestamps:true
})

export const Chat = mongoose.model("Chat",ChatSchma)