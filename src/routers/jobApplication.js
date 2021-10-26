const express= require('express');
const router = new express.Router();
const jobApplication= require('../models/jobApplication');


router.post('/jobApp',async(req,res)=>{
    const jobApp= new jobApplication(req.body) ;
    

    try {
         await jobApp.save();
         res.status(200).send(jobApp);
    } catch (error) {
        res.status(400).send(error);
    }

    
})

router.get('/jobApp/:id',async(req,res)=>{
    const jobID= req.params.id;

    try {
        const jobs= await jobApplication.find({jobID})
        res.status(200).send(jobs);
          
      } catch (error) {
          res.status(500).send(error);
      }
})

module.exports=router;