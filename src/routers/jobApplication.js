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


///////////////////////////////////////----------NOt working-------------//////////////////////////
router.patch('/jobApp/result/:id/:jid',async(req,res)=>{

    const SID= req.params.id;
    const jobID= req.params.jid;

    const updates= Object.keys(req.body);
    const allowedUpdates=['status']
    const isValidOperation= updates.every((update)=>{
         return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid operation!'});
    }


    


        const jobApp = await  jobApplication.find({jobID:jobID, SID:SID});
        console.log(jobApp);
        // updates.forEach((update)=>{
        //     jobApp[update]=req.body[update];
        // })
        jobApp[0].status= "SELECTED"
        console.log(jobApp);
        // await jobApp.markModified('jobApplication');
        await jobApp.save()
        
        


        // const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});

        if(!jobApp){
            return res.status(404).send();
        }

        res.send(jobApp);
        
   
    
})


module.exports=router;