const mongoose= require('mongoose');
const validator= require('validator');

const evalSchema= new mongoose.Schema({
   SID:{
       type:Number,
       required:true
   },
   studentName:{
       type:String,
       required:true,
       trim:true
   },
   mentorID:{
       type:mongoose.Types.ObjectId,
       ref:'Mentor'
   },
   mentorName:{
       type:String,
       trim:true,
       required:true
   },
   midtermReport:{
       type:String,
    //    required:true,
       trim:true
   },
   finalReport:{
       type:String,
    //    required:true,
       trim:true

   },
   mentorGrade:{
       type:Number,
    //    required:true
   },
   panelGrade:{
       type:Number,
    //    required:true
   },
   finalGrade:{
       type:Number,
    //    required:true
   }

})

const eval = mongoose.model('eval', evalSchema);

module.exports=eval;