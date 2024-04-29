import { asyncHandler } from "../utils/asyncHandler.js"; 
import ApiError from "../utils/ApiError.js" 
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
   // get user details from frontend
   // validation - not empty
   // check if user already exist: username, email
   // chesk for image, check for avtar
   // upload them to cloudinary, avtar
   // create user object - create entry in db
   // remove password and refresh token field from response
   // check for user creation
   // return res



   const {fullName, email, username, password} = req.body
   console.log("email: ", email);
//    console.log("password: ", password);
//    console.log("fullName: ", fullName);
//    console.log("username: ", username);
   
    //normal if condition
    // if (fullName=== "") {
    //     throw new ApiError(400, "fullName is required")
    // }

    //advance if condition
    if (
        [fullName, email, username, password].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "all field are required") 
    }
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with emai or username already exist")
    }

    const avtarlocalPath = req.field?.avtar[0]?.path
    const coverImageLocalPath =  req.files?.coverImage[0]?.path

    if(!avtarlocalPath) {
        throw new ApiError(400, "Avtar file is required")
    }

    const avtar = await uploadOnCloudinary(avtarlocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avtar) {
        throw new ApiError(400, "Avtar file is required")
    }

     const user = await User.create({
        fullName,
        avtar: avtar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(

        
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User register Successfully")
    )

})


export default registerUser; 