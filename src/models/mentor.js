const mongoose= require('mongoose');
const validator= require('validator')
const bcrypt= require('bcryptjs');

const mentorSchema= new mongoose.Schema({
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
    name : {
        type : String,
        required : true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        
    }

})



mentorSchema.statics.findByCredentials= async(email,password)=>{
    const mentor = await Mentor.findOne({email:email});
 
    if(!mentor){
        throw new Error('Please check your emailID')
    }
 
    const isMatch= await bcrypt.compare(password,mentor.password);
 
    if(!isMatch){
        throw new Error('Unable to login!')
    }
 
    return mentor;
 } 
 
 
 
 // Plain text passwords to hashed passwords.
 mentorSchema.pre('save',async function(next){
 
     const mentor= this;
 
     if(mentor.isModified('password')){
         mentor.password= await bcrypt.hash(mentor.password , 8); 
     }
 
     
     next();
 
 })



const Mentor= mongoose.model('Mentor',mentorSchema);

module.exports= Mentor;