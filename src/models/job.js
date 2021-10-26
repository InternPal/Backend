const mongoose= require('mongoose');
const validator= require('validator');

// const eligibilitySchema= mongoose.model('eligibilitySchema',{
//     cg:{
//         type:Number,
//         required:true
//     },
//     branch:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     backlogs:{
//         type:Number,
//         required:true
//     },
//     class10:{
//         type:Number,
//         required:true
//     },
//     class12:{
//         type:Number,
//         required:true
//     }
// });

// const hiringSchema =mongoose.model('hiringSchema',{
//     title:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     date:{
//         type:Date,
//         required:true
//     },
//     time:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     }
// });


const Job= mongoose.model('Job',{
     name:{
         type:String,
         required:true,
         trim:true
     },
     year:{
         type:Number,
         required:true
     },
     jobType:{
         type:String,
         required:true,
         trim:true
     },
     profile:{
         type:String,
         required:true,
         trim:true
     },
     location:{
         type:String,
         required:true,
         trim:true

     },
     jobFunction:{
         type:String,
         required:true,
         trim:true
     },
     pay:{
         type:Number,
         required:true
     },
     tier:{
         type:Number,
         required:true
     },
     description:{
         type:String,
         required:true,
         trim:true
     },
    //  cg:{
    //      type:Number,
    //      required:true
    //  },
    //  branch:{
    //      type:String,
    //      required:true,
    //      trim:true
    //  },
    //  backlogs:{
    //      type:Number,
    //      required:true
    //  }
    hiringWorkflow: [new mongoose.Schema({
        title:{
            type:String,
            required:true,
            trim:true
        },
        date:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true
        }
    })],
        
    eligibility:new mongoose.Schema({
        cg:{
            type:Number,
            required:true
        },
        branch:{
            type:Array,
            required:true,
            trim:true
        },
        backlogs:{
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
        }
    })



});


module.exports= Job;
