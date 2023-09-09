import express from "express";
import User from "../models/user.js";
const authRouter = express.Router();
import { v4 as uuidv4 } from 'uuid'
import checkLogin from "../middlewear/checkLogin.js";
import bcrypt from "bcrypt";
import apiResponse from "../utilities/response.js";


// signupApi 

// promise version
// authRouter.post("/signup", (req, res) => {
//       const { name, email, password } = req.body;

//       // validation: 
//         if (!name || !email || !password) {
//            return res.json({error: "Please fill all fields"});
//         }
//         //write validation on ur own for password length and email format
        
//         // check if user already exists
//         User.findOne({email : email})
//         .then((foundUser) => {
//              if(foundUser != null){
//                     return res.json({error: "User already exists, Dont' be an idiot"});
//              }
//         })
//         .catch((err) => {
//             console.log("Error finding user", err.message);
//             res.json({error: "Something went wrong"});
//         })

//         // save a new user to database
//         const newUser = new User({
//             name, email, password
//         })
//         newUser.save()
//         .then(() => {
//             res.json({message: "User saved successfully"});
//         })
//         .catch((err) => {
//             console.log("Error saving user to database", err.message);
//             res.json({error: "Something went wrong"});
//         })

// })

// async await version
authRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // validation: 
      if (!name || !email || !password) {
        //  return res.status(400).json({success: false, data: "", message: "", error: "Please fill all fields"});
         return apiResponse(res, 400, false, "", "", "Please fill all fields");
      }
      //write validation on ur own for password length and email format
      
      // check if user already exists
      try{
        const foundUser = await User.findOne({email : email})
        if(foundUser != null){
            
            return apiResponse(res, 400, false, "", "", "User already exists, Dont' be an idiot");
        }
         // save a new user to database
          // use bcrypt to encrypt password
          const encryptedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
            name:name, 
            email:email, 
            password: encryptedPassword
        })
        const savedUser = await newUser.save()
        console.log("User saved successfully", savedUser);
        return apiResponse(res, 200, true, "User saved successfully", savedUser, "");
      }
      catch(err){
        console.log("Error finding user", err.message);
        return apiResponse(res, 500, false, "", "", "Something went wrong");
      }
      
     
      

})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // validation:
    if (!email || !password) {
        return res.json({error: "Please fill all fields"});
    }
    try{
    const foundUser = await User.findOne({email: email})
    if(!foundUser){
        return res.json({error: "User does not exist"});
    }
    // compare password
     const compare = await bcrypt.compare(password, foundUser.password)
    if(!compare){
        // console.log(foundUser.password, password);
        return res.json({error: "Invalid credentials"});
    }
    const token = uuidv4();
    foundUser.token = token;
    const savedUser = await foundUser.save();
    res.json({message: "User logged in successfully", data: savedUser});
   }
    catch(err){
        console.log("Error finding user", err.message);
        res.json({error: "Something went wrong"});
    }

})



authRouter.get("/secret", checkLogin, async (req, res) => {
    //  const token = req.headers.authorization;
    //     if(!token){
    //         return res.json({error: "Please login first"});
    //     }
    //  try{
    //     const foundUser = await User.findOne({token: token});
    //     if(!foundUser){
    //         return res.json({error: "Please login first"});
    //     }
        res.json({message: "We know the plan about Ukraine Russia War"});
    //  }
    //  catch(err){
    //     console.log("Error finding user", err.message);
    //     res.json({error: "Something went wrong"});
    //  }
    
})

authRouter.delete("/logout",checkLogin, async (req, res) => {

    try{
        const foundUser = req.user;
        console.log("foundUser", foundUser);
        foundUser.token = null;
        const savedUser = await foundUser.save();
        res.json({message: "Logout successfull"});
     }
     catch(err){
        console.log("Error finding user", err.message);
        res.json({error: "Something went wrong"});
     }

})





export default authRouter;


// en exmaple of encryption and decryption
// 123456 => "sacgijkebifwebfiw"
// "sacgijkebifwebfiw" => 123456

// token based authentication

// middlewear

// response format

// Controllers



 