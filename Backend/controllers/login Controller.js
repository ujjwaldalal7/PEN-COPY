import { comparepassword } from '../helpers/authHelper.js'
import usermodel from '../models/user.js'
import JWT from 'jsonwebtoken'
export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            res.status(404).send({
                success:false,
                message:'Invalid Email or Password'
            })
        }
        const user= await usermodel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        const match=await comparepassword(password,user.password)
        if(!match){
            return res.status(201).send({
                success:true,
                message:'Invaild Password'
                
            })
        }
        const token =await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1y'
        })
        res.status(200).send({
            success:true,
            message:"LogIn Successful",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in logging in',
            error
        })
    }
}
export const testController=(req,res)=>{
    res.send({
        message:'protected route'
    }
    )
}