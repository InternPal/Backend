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




router.patch('/:id',async(req,res)=>{

    const updates= Object.keys(req.body);
    const allowedUpdates=['eligibility']
    const isValidOperation= updates.every((update)=>{
         return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid operation!'});
    }

    
    try {


        const job = await Job.findById(req.params.id);

        updates.forEach((update)=>{
            job[update]=req.body[update];
        })
        await job.save();


        // const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});

        if(!job){
            return res.status(404).send();
        }

        res.send(job)
        
    } catch (error) {
        res.status(400).send(error);
    }
    
})




module.exports=router;