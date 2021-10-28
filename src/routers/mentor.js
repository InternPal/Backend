const express= require('express');
const router = new express.Router();
const Mentor= require('../models/mentor');


router.post('/',async(req,res)=>{
    const mentor= new Mentor(req.body) ;
    

    try {
         await mentor.save();
         res.status(200).send(mentor);
    } catch (error) {
        res.status(400).send(error);
    }

    
})


router.get('/',async(req,res)=>{

    try {
        const mentors= await Mentor.find({});
        res.send(mentors);
    } catch (error) {
        res.status(500).send()
    }
})


router.get('/:id',async(req,res)=>{

    const _id=req.params.id;

    try {
        const mentor=await Mentor.findById(_id);

        if(!mentor){
            res.status(404).send()
        }
        res.send(mentor)
        
    } catch (error) {
        res.status(500).send()
    }

})



module.exports=router;