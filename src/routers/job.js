const express= require('express');
const router = new express.Router();
const Job= require('../models/job');


router.post('/',async(req,res)=>{
    const job= new Job(req.body) ;
    

    try {
         await job.save();
         res.status(200).send(job);
    } catch (error) {
        res.status(400).send(error);
    }

    
})




router.get('/',async(req,res)=>{

    try {
        const jobs= await Job.find({});
        res.send(jobs);
    } catch (error) {
        res.status(500).send()
    }
})




router.get('/:id',async(req,res)=>{

    const _id=req.params.id;

    try {
        const job=await Job.findById(_id);

        if(!job){
            res.status(404).send()
        }
        res.send(job);
        
    } catch (error) {
        res.status(500).send()
    }

})




module.exports=router;