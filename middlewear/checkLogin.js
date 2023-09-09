import User from "../models/user.js";

const checkLogin = async (req, res, next) => {

    const token = req.headers.authorization;
    if(!token){
        return res.json({error: "Please login first"});
    }
    try{
        const foundUser = await User.findOne({token: token});

        if(!foundUser){
            return res.json({error: "User Not Found"});
        }
        req.user = foundUser;
        next()

     }
    catch(err){
        console.log("Error finding user", err.message);
        res.json({error: "Something went wrong"});
    }
}

export default checkLogin;
    
