const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Username is required!'],
        unique:true
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true

    },
    password:{  
         type: String,
         required: [true,'Password is required!']
    },

    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},
{
    timestamps:true
},
)


// hash the password before saving it to the database
userSchema.pre('save',async function(next){
    const user = this;
    //if(!user.isModified('password')) next()
    if(!user.isModified('password')) return next();
    
     try {
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password,salt)
        next()
     } catch (error) {
       return next(error)
        
     }   

})

// compare the given password with the hashpassword in the database

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password)

}

const User = mongoose.model('User',userSchema)

module.exports = User