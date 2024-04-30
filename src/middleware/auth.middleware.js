import Jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"



export const verifingJWT = asyncHandler(async (req,_,next)=>{
    try {
        const token = req.cookies?.accassToken || req.header("AuthoriZation")?.replace("Bearer ","") 
    
        if(!token){
            throw new ApiError(407,"Unauthorized request")
        }
        
        const decodedToken = Jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken?._id)
        .select("-refreshToken -password");
        
        if(!user){
            throw new ApiError(401,"invalid Access Token user dose not exist")
        }
    
        req.user = user; 
        next()
    } catch (error) {
        throw new ApiError(401,error?.massage || "Invalid access token")
    }
})