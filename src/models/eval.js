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
   facultyCoordinatorID:{
       type:mongoose.Types.ObjectId,
       ref:'facultyCoordinator'
   },
   facultyCoordinatorName:{
       type:String,
       trim:true,
       required:true
   },
   industryCoordinatorID:{
       type:mongoose.Types.ObjectId,
       ref:'industryCoordinator'
   },
   industryCoordinatorName:{
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