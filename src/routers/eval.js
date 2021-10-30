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


router.post('/eval',async(req,res)=>{
    // const objects=req.body.objects;

    // eval.insertMany(objects, onInsert);
    // function onInsert(err,result){
    //     if(err){
    //          res.status(404).send(err);
    //     }

    //     res.status(404).send(result);
    // }

    eval.insertMany(req.body)  
    .then((result) => {
            console.log("result ", result);
            res.status(200).json({'success': 'new documents added!', 'data': result});
    })
    .catch(err => {
            console.error("error ", err);
            res.status(400).json({err});
    });
})


router.post('/eval/midReport',async(req,res)=>{
    const SID= req.body.SID;
    const string= req.body.string;

    try {
        
        const eval= await eval.findOne({SID});
    eval.midtermReport= string;
    await eval.save();
    res.status(200).send(eval);
    } catch (error) {
        res.status(404).send(error);
    }

    
})

router.post('/eval/finalReport',async(req,res)=>{
    const SID= req.body.SID;
    const string= req.body.string;

    try {
        
        const eval= await eval.findOne({SID});
    eval.finalReport= string;
    await eval.save();
    res.status(200).send(eval);
    } catch (error) {
        res.status(404).send(error);
    }

    
})

router.post('/eval/mentorGrade',async(req,res)=>{
    const SID= req.body.SID;
    const number= req.body.number;

    try {
        
        const eval= await eval.findOne({SID});
    eval.mentorGrade= number;
    await eval.save();
    res.status(200).send(eval);
    } catch (error) {
        res.status(404).send(error);
    }
})


router.post('/eval/panelGrade',async(req,res)=>{
    const SID= req.body.SID;
    const number= req.body.number;

    try {
        
        const eval= await eval.findOne({SID});
        eval.panelGrade= number;
        await eval.save();
    res.status(200).send(eval);
    } catch (error) {
        res.status(404).send(error);
    }
})




module.exports=router;