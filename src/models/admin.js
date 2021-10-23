const mongoose= require('mongoose');
const validator= require('validator')
const bcrypt= require('bcryptjs');

const adminSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,  
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        
    }

       

})

const Admin = mongoose.model('Admin', adminSchema);

module.exports= Admin;