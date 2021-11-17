const express= require('express');
const router = new express.Router();
const industryCoordinator= require('../models/industryCoordinator');


router.post('/',async(req,res)=>{
    const industry= new industryCoordinator(req.body) ;
    

    try {
         await industry.save();
         res.status(200).send(industry);
    } catch (error) {
        res.status(400).send(error);
    }

    
})


router.get('/',async(req,res)=>{

    try {
        const industries= await industryCoordinator.find({});
        res.send(industries);
    } catch (error) {
        res.status(500).send()
    }
})


router.get('/:id',async(req,res)=>{

    const _id=req.params.id;

    try {
        const industry=await industryCoordinator.findById(_id);

        if(!industry){
            res.status(404).send()
        }
        res.send(industry)
        
    } catch (error) {
        res.status(500).send()
    }

})



module.exports=router;