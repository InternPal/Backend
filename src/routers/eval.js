const express= require('express');
const router = new express.Router();
const eval= require('../models/eval');


router.get('/eval/:id',async(req,res)=>{
    const mentorID= req.params.id;
    try {
        const evals= await eval.find({mentorID});
        res.status(200).send(evals);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/evals/:sid',async(req,res)=>{
    const SID= req.params.sid;
    try {
        const eval= await eval.findOne({SID});
        res.status(200).send(eval);
    } catch (error) {
        res.status(500).send(error);
    }
})






module.exports=router;