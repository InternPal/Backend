const mongoose= require('mongoose');
const validator= require('validator')
const bcrypt= require('bcryptjs');

const facultyCoordinatorSchema= new mongoose.Schema({
    email:{
        type:String,
        
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
        type : String
        
    },
    password:{
        type:String,
        
        trim:true,
        
    }

})



facultyCoordinatorSchema.statics.findByCredentials= async(email,password)=>{
    const faculty = await facultyCoordinator.findOne({email:email});
 
    if(!faculty){
        throw new Error('Please check your emailID')
    }
 
    const isMatch= await bcrypt.compare(password,faculty.password);
 
    if(!isMatch){
        throw new Error('Unable to login!')
    }
 
    return faculty;
 } 
 
 
 
 // Plain text passwords to hashed passwords.
 facultyCoordinatorSchema.pre('save',async function(next){
 
     const faculty= this;
 
     if(faculty.isModified('password')){
         faculty.password= await bcrypt.hash(faculty.password , 8); 
     }
 
     
     next();
 
 })



const facultyCoordinator= mongoose.model('facultyCoordinator',facultyCoordinatorSchema);

module.exports= facultyCoordinator;