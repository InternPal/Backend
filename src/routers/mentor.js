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



module.exports=router;