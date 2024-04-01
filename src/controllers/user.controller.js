import { User } from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessTokenAndRefereshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accassToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        // console.log(refreshToken);
        
        return {accassToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"somthing want wrong when generating Token")
    }
}

const options = {
    httpOnly: true,
    secure: true,
    // maxAge: 60 * 60 * 2
}

const regusterUser = asyncHandler(async (req,res)=>{
    const {userName,email,password} = req.body
    if([userName,email].some((fild)=> fild?.trim() === "")){
        throw new ApiError(400,"Please fill all fields")
    }
    //Checking if user already exists in the database
    const existedUser = await User.findOne({
        $or: [{ userName },{ email }]
    })
    if(existedUser) {
        
        throw new ApiError(405,"user alrady  exist");
    }
    //Create a new user and save it to the database
    const user =await User.create({
        userName,
        email,
        password
    })
    
    const cretedUser = await User.findById(user._id)
    .select("-refreshToken -password")//we don't want to send the password back to the client side so we use this method to hide it

    if(!cretedUser){
        throw new ApiError(500,"there was an problem while uploding")
    }
    const {accassToken,refreshToken} = await generateAccessTokenAndRefereshToken(user._id)
    return res
    .status(200)
    .json(
        new ApiResponce(200,{cretedUser,accassToken,refreshToken},"user created succesfully")
    )
})

const loginUser = asyncHandler(async (req,res)=>{
    const {email ,password} = req.body
    // console.log(email);
    
    if(email.trim() === ""){
        throw new ApiError(400,'please email')
    }

    // const user = await User.findOne({
    //     $or: [{userName},{email}]
    // })
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(404,"NO user found by your give details")
    }
    const isPasswordMatching = await user.IspasswordCorrect(password);
    // console.log(isPasswordMatching);
    
    if(!isPasswordMatching){
        throw new ApiError(401,"Invalid Password")
    }

    const {accassToken,refreshToken} = await generateAccessTokenAndRefereshToken(user._id)

    // we can also update user by updating user object 
    //or
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
    .status(200)
    .cookie("accassToken",accassToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponce(200,{
            user: loggedInUser, 
            accassToken,
            refreshToken
        },
        "user logged in successfully")
    )

})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $unset:{
                refereshToken: 1 //this will remove from document
            }
        },
        {
            new:true
        }
    )

    return res
    .status(200)
    .clearCookie("accassToken",options)
    .clearCookie("refereshToken",options)
    .json(new ApiResponce(200,{},"user logged out"))

})

const deleteUser = asyncHandler(async(req,res)=>{
    const user = req.user?._id
    // console.log(user);
    
    if(!user){
        throw ApiError(401,"Problem while requesting user")
    }
    
    const deleted = await User.findByIdAndDelete(user)

    if(!deleted){
        new ApiError(400,"deleeting unsuccessfull")
    }

    return res
    .status(200)
    .clearCookie("accassToken",options)
    .clearCookie("refereshToken",options)
    .json(
        new ApiResponce(200,{},"User deleted successfully")
    )
})
const editUsername = asyncHandler(async(req,res)=>{
    const user = req.user?._id
    // console.log(user);
    if(!user){
        throw new ApiError(401,"Problem while requesting user")
    }
    const {userName} = req.body
    if(!userName){
        throw new ApiError(400,"Please provide username")
    }
    const updated = await User.findByIdAndUpdate(user,{
        userName
    },{
        new:true
    })
    .select("-password -refreshToken")

    if(!updated){
        throw new ApiError(400,"Problem while updating user")
    }

    return res
    .status(200)
    .json(
        new ApiResponce(200,updated,"User updated successfully")
    )
})


const getCurrentUserProfile = asyncHandler(async (req,res)=>{
    const user = req.user?._id;
    //console.log(user);
    if(!user){
        throw new ApiError(401,'Not authorized to perform this action')
    }
    const currrentUser =await User.findById(user)
    .select('-password -refreshToken')

    if(!currrentUser){
        throw new ApiError(404,'No such user found!')
    }

    return res
    .status(200)
    .json(
        new ApiResponce(200,currrentUser,"User geted successfully")
    )
})
export {
    regusterUser,
    loginUser,
    logoutUser,
    getCurrentUserProfile,
    deleteUser,
    editUsername
};