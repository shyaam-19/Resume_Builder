import JWT from "jsonwebtoken";
import { hashPassword,comparePassword,validPassword } from "../helper/authhelper.js";
import userModel from "../models/userModel.js";
import userResumeListModel from "../models/userResumeListModel.js";

export const registerController = async(req,res)=>{
    try {
        const {firstName,lastName,email,password,confPassword,profilePhoto} = req.body

        if(!firstName){
            return res.status(406).send('First Name is cannot be empty')
        } 
        if(!lastName){
            return res.status(406).send('last Name is cannot be empty')
        } 
        if(!email){
            return res.status(406).send('email is cannot be empty')
        } 
        if(!password){
            return res.status(406).send('password is cannot be empty')
        } 
        if(!profilePhoto){
            return res.status(406).send('profile photo url is cannot be empty')
        }
        if(password.length<8){
            return res.status(406).send('Password must be contain minimum 8 letters')
        }
        if(!validPassword(password)){
            return res.status(406).send('Password must contain minimum one small and capital letter and one number')
        }
        if(confPassword!=password){
            return res.status(406).send('Password & Confirm Password doesn\'t match')
        }
        

        const userExist = await userModel.findOne({email});

        if(userExist){
            return res.status(200).send({
                success:false,
                message : 'User already registerd'
            });
        }

        const hasedpassword = await hashPassword(password);

        const user = await new userModel({firstName,lastName,email,profilePhoto,password:hasedpassword}).save();
        await new userResumeListModel({email}).save();

        return res.status(200).send({
            succsess:true,
            message:'Registerd successfully',
            user:user
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in registration',
            error
        })
    }
};

export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(200).send({
                success : false,
                message : 'User Not Found'
            })
        }

        const checkPassword = await comparePassword(password,user.password);
        if(!checkPassword){
            return res.status(200).send({
                success : false,
                message : "Invalid Password"
            });
        }

        const token = await JWT.sign({_id:user._id},process.env.JWT_KEY);
        // console.log(token);

        user.token = user.token.concat({token:token});
        await user.save();
        res.cookie("jwt",token,
            {
                expires : new Date(Date.now() + 500000)
            }
        );
        return res.status(202).send({
            success:true,
            message:'Valid user',
            token : token
        });
    } catch (error) {
        console.log(error)
    }
};