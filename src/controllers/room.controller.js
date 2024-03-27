import mongoose, {isValidObjectId} from "mongoose"
import { Room } from "../models/room.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createRoom = asyncHandler(async (req,res)=>{
    const {name , discription} = req.body
    if([name,discription].some((fild)=> fild?.trim() === "")){
        throw new ApiError(400,"Please fill all fields")
    }
    const room= await Room.create({
        name,
        discription,
        owner: req.user?._id
    })
    if(!room){
        new ApiError(500,"there is an problem while creting room")
    }

    res.status(201)
    .json(
        new ApiResponce(200,room,"Room created successfully")
    )
})

const deleteRoom = asyncHandler(async (req,res)=>{
    const userId = req.user?._id
    const {roomId} = req.params;
    const room =await Room.findById(roomId)
    if(!room){
        throw new ApiError(404,"No room with given id found")
    }
    if (!userId.equals(room.owner)) {
      throw new ApiError(403, 'You do not have permission to perform this action');
    }
    const deleted = await Room.findByIdAndDelete(roomId)
    if(!deleted){
        throw new ApiError(500,"ther is an problem ehile deleteing room")
    }

    return res
    .status(200)
    .json(
        new ApiResponce(200,null,'Deletion Successful')
    )

})

const editRoom = asyncHandler(async (req,res)=>{
    const {name,discription} = req.body
    if([name,discription].some((fild)=> fild?.trim() === "")){
        throw new ApiError(400,"Please fill all fields")
    }
    const {roomId} = req.params;
    const userId = req.user?._id
    const room = Room.findById(roomId);
    if(!room){
        throw new ApiError(404,"No room with given id found")
    }
    if (!userId.equals(room.owner)) {
        throw new ApiError(403, 'You do not have permission to perform this action');
    }

    room.name= name
    room.discription = discription
    await Room.save();

    return res
    .status(200)
    .json(
        new ApiResponce(200,room,'Update Successfull')
    )
})

const getRoom = asyncHandler(async (req,res)=>{
    const {roomId} = req.params
    
    console.log(roomId);
    
    if(!roomId){
        throw new ApiError(400,"Invalid room Id")
    }
    const room = await Room.findById(roomId)
    if(!room){
        throw new ApiError(500,"there is no such room in DB")
    }
    return res
    .status(200)
    .json(
        new ApiResponce(200,room)
    )
})

const getAllRooms = asyncHandler(async(req,res)=>{
    const userName = req.user?.userName
    const rooms = await Room.aggregate([
        {
            $sort: {
              createdAt: -1
            }
          }
    ])
    if(!rooms){
        throw new ApiError(404,"Not found anyone room")
    }

    return res
    .status(200)
    .json(new ApiResponce(200,[rooms,userName],"Done"))
})

export {
    createRoom,
    deleteRoom,
    editRoom,
    getRoom,
    getAllRooms
}