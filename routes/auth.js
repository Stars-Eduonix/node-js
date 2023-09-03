import express from "express";
import User from "../models/user.js";
const authRouter = express.Router();

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
         return res.json({error: "Please fill all fields"});
      }
      //write validation on ur own for password length and email format
      
      // check if user already exists
      try{
        const foundUser = await User.findOne({email : email})
        if(foundUser != null){
            return res.json({error: "User already exists, Dont' be an idiot"});
        }
         // save a new user to database
        const newUser = new User({
            name, email, password
        })
        const savedUser = await newUser.save()
        console.log("User saved successfully", savedUser);
        res.json({message: "User saved successfully"});

      }
      catch(err){
        console.log("Error finding user", err.message);
        res.json({error: "Something went wrong"});
      }
      
     
      

})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // validation:
    if (!email || !password) {
        return res.json({error: "Please fill all fields"});
    }
    const foundUser = await User.findOne({email: email})
    if(!foundUser){
        return res.json({error: "User does not exist"});
    }
    if(foundUser.password !== password){
        console.log(foundUser.password, password);
        return res.json({error: "Invalid credentials"});
    }
    res.json({message: "User logged in successfully"});

})

authRouter.get("/secret", (req, res) => {
    res.json({message: "We know the plan about Ukraine Russia War"});
})





export default authRouter;


// en exmaple of encryption and decryption
// 123456 => "sacgijkebifwebfiw"
// "sacgijkebifwebfiw" => 123456

// token based authentication

// middlewear

// response format

// Controllers