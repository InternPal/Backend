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

adminSchema.statics.findByCredentials= async(email,password)=>{
    const admin = await Admin.findOne({email:email});
 
    if(!admin){
        throw new Error('Please check your emailID')
    }
 
    const isMatch= await bcrypt.compare(password,admin.password);
 
    if(!isMatch){
        throw new Error('Unable to login!')
    }
 
    return admin;
 }

const Admin = mongoose.model('Admin', adminSchema);

module.exports= Admin;