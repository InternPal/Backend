const mongoose= require('mongoose');
const validator= require('validator')
const bcrypt= require('bcryptjs');

const industryCoordinatorSchema= new mongoose.Schema({
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



industryCoordinatorSchema.statics.findByCredentials= async(email,password)=>{
    const industry = await industryCoordinator.findOne({email:email});
 
    if(!industry){
        throw new Error('Please check your emailID')
    }
 
    const isMatch= await bcrypt.compare(password,industry.password);
 
    if(!isMatch){
        throw new Error('Unable to login!')
    }
 
    return industry;
 } 
 
 
 
 // Plain text passwords to hashed passwords.
 industryCoordinatorSchema.pre('save',async function(next){
 
     const industry= this;
 
     if(industry.isModified('password')){
         industry.password= await bcrypt.hash(industry.password , 8); 
     }
 
     
     next();
 
 })



const industryCoordinator= mongoose.model('industryCoordinator',industryCoordinatorSchema);

module.exports= industryCoordinator;