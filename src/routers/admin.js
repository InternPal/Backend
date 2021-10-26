const express= require('express');
const router = new express.Router();
const Admin= require('../models/admin');
const Job= require('../models/job');


router.get('/getJobs',async(req,res)=>{
    const year=req.body.year;
    const type=req.body.jobType;

    Job.where('year').equals(year)
        .where('jobType').equals(type)
         .exec(function(err,result){
             if(err){
                 res.status(500).send(err);
             }else{
                 res.send(result);
             }
         })
})





module.exports=router;