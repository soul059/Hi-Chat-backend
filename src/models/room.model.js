import mongoose from "mongoose"

const RoomSchma = mongoose.Schema({
    name: { type: String,
        unique: true, 
        required: true 
    },
    discription:{
        type :String,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

},{timestamps:true})

export const Room = mongoose.model("Room",RoomSchma)