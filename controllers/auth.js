const User = require('./../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// register user
const register = async(req,res,next)=>{
    const {username,email,password} = req.body;

    try {
        const user = new User({
            username,email,password
        })
        await user.save()
        res.status(201).json({message:'regiter successfull!'})
    } catch (error) {
        return next(error)
        
    }
}

// login user

const login = async(req,res,next)=>{
    const {username,password} = req.body
    
    try {
        const user = await User.findOne({username})
        
        if(!user){
            throw {status:404,message:'Wrong Credentials!'}
        }
        const matchPassword = await user.comparePassword(password)
        console.log(matchPassword?'true':'false')

        if(!matchPassword){
            throw{status:404,message:'Wrong Credentials!'}
        }
        const token = await jwt.sign({userId:user._id},process.env.JWT_SECRET,{
            expiresIn:'2 hour'
        })

        const userData = {
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
        res.status(200).json({user:userData,token})
    } catch (error) {
        next(error)
        
    }
}

const profile =async(req,res,next)=>{
    try {
        const user = req.user
        const userData = {
            username:user.username,
            email:user.email,
            role:user.role
        }
        res.json({user:userData})
    } catch (error) {
        next(error)
        
    }
}

const updateProfile = async(req,res,next)=>{
    try {
        const user = req.user
        const update = req.body
        const allowedUpdates = ['username','email']
        const keyToupdates = Object.keys(update)
        const isValidOperation = keyToupdates.every(key=>allowedUpdates.includes(key))
        if(!isValidOperation){
            throw{status:400,message:'Invalid Update!'}
        }

        keyToupdates.forEach(key=>{
            user[key] = update[key]
        })
       await user.save()

       const updateUserData = {
        username:user.username,
        email:user.email,
        role:user.role
       }

       res.status(201).json({success:true,user:updateUserData})
    } catch (error) {
        next(error)
        
    }
}


module.exports = {register,login,profile,updateProfile}