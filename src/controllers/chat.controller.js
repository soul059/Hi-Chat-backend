import mongoose, {isValidObjectId} from "mongoose"
import { Room } from "../models/room.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Chat } from "../models/chat.model.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const createChat = asyncHandler(async(req,res)=>{
    const {text} = req.body
    const {roomId} = req.params
    const userId = req.user?._id
    

    const chat =await Chat.create({
        text:text,
        owner: userId,
        room:  roomId,
        ownerName: req.user.userName,
    })

    return res
    .status(200)
    .json(
        new ApiResponce(200,chat,"chat is created successfully")
    )
})

const deleteChat = asyncHandler(async(req,res)=>{
    const {chatId}=req.params;
    
    const userId = req.user?._id
    console.log(userId);
    
    const chat =await Chat.findById(chatId)
    console.log(chat.owner);
    
    //checking the owner of this chat
    if (!userId.equals(chat.owner)) {
        throw new ApiError(403, 'You do not have permission to perform this action');
    }
    const deletestatus = await Chat.findByIdAndDelete(chatId);
    if(!deletestatus){
        throw new ApiError(500,"Server error");
    }
    return res
    .status(200)
    .json(
        new ApiResponce(200,deletestatus,"chat is Deleted successfully")
    )

})
// need to upgerd deleteChat

const getAllChatsInARoom= asyncHandler (async (req , res)=>{
    const {roomId} = req.params;
    const user = req.user?.userName;
    const room = await Room.findById(roomId)
    if(!room){
        throw new ApiError(404,'Room does not exist')
    }
    const chats = await Chat.aggregate([
        {
            $match:{
                room : new mongoose.Types.ObjectId(roomId)
            }
        },
        {
            $sort:{
                createdAt:-1
            }
        },
        {
            $project:{
                ownerName:1,
                text:1
            }
        }
    ])

    if(!chats){
        return new ApiError(404,"No Chats in This Room")
    }

    return res
    .status(200)
    .json(
        new ApiResponce(200,[chats,user],"chat are fetched Successfully")
        // new ApiResponce(200,chats,"chat are fetched Successfully")
    )

})

export  {createChat,deleteChat,getAllChatsInARoom}