const mongoose= require('mongoose');
const validator= require('validator')
const bcrypt= require('bcryptjs');


const studentSchema= new mongoose.Schema({
    SID:{
        type:Number,
        required:true,
        trim:true,
        unique:true
        // validate(value){
        //     if(value.length!== 8){
        //         throw new Error('Invalid SID')
        //     }
        // }

    },
    
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email :{
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
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Change Password')
            }
        }
    },
    gender:{
        type:String,
        required:true,
        trim:true

    },
   offer:{
        type:Boolean,
        required:true
   },
    dob:{
        type:Date,
        required:true

    },
    phone:{
        type:Number,
        required:true
        

    },
    branch:{
        type:String,
        required:true

    },
    cgList:[{
        sgpa:{
            type:String,
            required:true
        },
        cgpa:{
            type:String,
            required:true
        }
    }],
    cgpa:{
        type:Number,
        required:true

    },
    class10:{
        type:Number,
        required:true

    },
    class12:{
        type:Number,
        required:true

    },
    backlogList:[{
         total:{
             type:String,
             required:true
         },
         ongoing:{
             type:String,
             required:true
         }
    }],
    backlogs:{
        type:Number,
        required:true

    },
    semester:{
        type:Number,
        required:true

    },
    github:{
        type:String
        

    },
    linkedin:{
        type:String

    },

    userDP : {
        type : Buffer,
        required:true  
    },

    resume : {
        type : Buffer,
        required:true
    },

    collegeDMC : {
        type : Buffer,
        required:true
    },

    class12DMC : {
        type : Buffer,
        required:true
    },

    class10DMC : {
        type : Buffer,
        required:true
    }
})


studentSchema.statics.findByCredentials= async(email,password)=>{
    const student = await Student.findOne({email:email});
 
    if(!student){
        throw new Error('Please check your emailID')
    }
 
    const isMatch= await bcrypt.compare(password,student.password);
 
    if(!isMatch){
        throw new Error('Unable to login!')
    }
 
    return student;
 } 
 
 
 
 // Plain text passwords to hashed passwords.
 studentSchema.pre('save',async function(next){
 
     const student= this;
 
     if(student.isModified('password')){
         student.password= await bcrypt.hash(student.password , 8); 
     }
 
     
     next();
 
 })

const Student= mongoose.model('Student',studentSchema);


module.exports= Student;