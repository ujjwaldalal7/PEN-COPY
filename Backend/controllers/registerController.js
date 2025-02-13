import { hashpassword } from '../helpers/authHelper.js'
import usermodel from '../models/user.js'
export const registerController=async(req,res)=>{
    try{
        const {name,email,password,phone,address}=req.body
        if(!name){
            return res.send({message:'Name is required'})
        }
        if(!email){
            return res.send({message:'Email is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
        }
        if(!phone){
            return res.send({message:'Phone No. is required'})
        }
        if(!address){
            return res.send({message:'Address is required'})
        }

        const checkuser=await usermodel.findOne({email:email})
        if(checkuser){
            return res.status(200).send({
                success:false,
                message:'Already Registered, Please Log In',
            })
        }

        const hashedpassword=await hashpassword(password);
        const user= await new usermodel({name,email,password:hashedpassword,phone,address}).save();

        res.status(201).send({
            success:true,
            message:'User registered successully',
            user,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in registeration',
            error
        })
    }
}

