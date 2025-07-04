import httpStatus from "http-status";
import {User} from "../models/userModel.js"
import bcrypt , {hash} from "bcrypt"
import crypto from "crypto";

//login route 

const login = async(req,res) =>{
    const{username, password} = req.body;
     if(!username|| !password){
    return res.status(404).json({message:"Enter Valid Data"});//httpstatus for getting all messages of error

     }
    try{
        const user = await User.findOne({username});
        if(!user){
                return res.status(httpStatus.NOT_FOUND).json({message:"Not Found"});//httpstatus for getting all messages of error
        }

        if(bcrypt .compare(password, user.password)){
           let token = crypto.randomBytes(20).toString("hex");
           user.token = token;
           await user.save();
       return res.status(httpStatus.OK).json({token: token});//httpstatus for getting all messages of error
        }
        

    }catch(e){
                return res.status(500).json({message:`Something went wrong ${e}`});//httpstatus for getting all messages of error

    }
}









//register route 
const register = async(req,res)=>{
    const{name, username, password} = req.body;

  try{
      
      const existingUser = await User.findOne({username});
      if(existingUser){ // first checking s their any username exist in out DB
        return res.status(httpStatus.FOUND).json({message:"User already Exist"});//httpstatus for getting all messages of error
      }

      const hashedPassword = await bcrypt.hash(password, 10);// encrpting out password before put in DB

      const newUser = User({  // adding in out DB user 
        name:name,
        username:username,
        password:hashedPassword,
      });

      await newUser.save();
       res.status(httpStatus.CREATED).json({message:"User Registered" });

  }catch(e){

    res.json({message: `Something went Wrong ${e} `});

  }

  }



export {login, register}