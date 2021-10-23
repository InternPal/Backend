const mongoose= require('mongoose');
const validator= require('validator');

const jobAppSchema =new mongoose.Schema({
   studentID:{
       type:Schema.Types.ObjectId,
       ref:'Student'
   },
   jobID:{
       type:Schema.Types.ObjectId,
       ref:'Job'
   },
   status: String
})
const jobApplication = mongoose.model('jobApplication',jobAppSchema);


module.exports = jobApplication;
