const mongoose= require('mongoose');
const validator= require('validator');

const jobAppSchema =new mongoose.Schema({
   studentID:{
       type:mongoose.Types.ObjectId,
       
       ref:'Student'
   },
   SID:{
       type: Number,
       required:true,
       
   },
   studentName:{
       type:String,
       required:true,
       trim:true
   },
   jobID:{
       type:mongoose.Types.ObjectId,
       ref:'Job'
   },
   jobCompany:{
       type:String,
       required:true
   },
   jobProfile:{
       type:String,
       required:true
   },
   jobLocation:{
       type:String,
       required:true
   },
   status: {
       type:String
   }
})
const jobApplication = mongoose.model('jobApplication',jobAppSchema);


module.exports = jobApplication;
