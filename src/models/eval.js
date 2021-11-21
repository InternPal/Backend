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
   joiningReport : { type : mongoose.SchemaTypes.Mixed, default : null },
   studentFeedbackForm : { type : mongoose.SchemaTypes.Mixed, default : null },
   firstVisitReport :{ type :  mongoose.SchemaTypes.Mixed, default : null },
   secondVisitReport : { type : mongoose.SchemaTypes.Mixed, default : null },
   industryFeedbackForm : { type : mongoose.SchemaTypes.Mixed, default : null },
   industryEvaluationForm : { type : mongoose.SchemaTypes.Mixed, default : null },

})

const eval = mongoose.model('eval', evalSchema);

module.exports=eval;