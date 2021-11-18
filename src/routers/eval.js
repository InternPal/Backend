const express= require('express');
const router = new express.Router();
const eval= require('../models/eval');

router.get('/evals/:sid',async(req,res)=>{
    const SID= +req.params.sid;
    try {
        const obj = await eval.findOne({SID});
        res.status(200).send(obj);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/eval/facultyCoordinator/:id',async(req,res)=>{
    const facultyCoordinatorID= req.params.id;
    try {
        const evals= await eval.find({facultyCoordinatorID});
        res.status(200).send(evals);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/eval/industryCoordinator/:id',async(req,res)=>{
    const industryCoordinatorID= req.params.id;
    try {
        const evals= await eval.find({industryCoordinatorID});
        res.status(200).send(evals);
    } catch (error) {
        res.status(500).send(error);
    }
})


router.get('/eval',async(req,res)=>{
    try {
        const evals= await eval.find({});
        res.status(200).send(evals);
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
            res.status(200).json({'success': 'new documents added!', 'data': result});
    })
    .catch(err => {
            res.status(400).json({err});
    });
})


router.post('/eval/midReport',async(req,res)=>{
    const SID= +req.body.SID;
    const string= req.body.string;

    try {
        
    const obj = await eval.findOne({SID});
    obj.midtermReport= string;
    await obj.save();
    res.status(200).send(obj);
    } catch (error) {
        res.status(404).send(error);
    }

    
})

router.post('/eval/finalReport',async(req,res)=>{
    const SID= req.body.SID;
    const string= req.body.string;

    try {
        
        const obj= await eval.findOne({SID});
    obj.finalReport= string;
    await obj.save();
    res.status(200).send(obj);
    } catch (error) {
        res.status(404).send(error);
    }

    
})


router.post('/eval/mentorGrade',async(req,res)=>{
    const SID= req.body.SID;
    const number= req.body.number;

    try {
        
        const obj= await eval.findOne({SID});
    obj.mentorGrade= number;
    if(obj.panelGrade !== null){
        obj.finalGrade = (obj.mentorGrade + obj.panelGrade)/2;
    }
    await obj.save();
    res.status(200).send(obj);
    } catch (error) {
        res.status(404).send(error);
    }
})


router.post('/eval/panelGrade',async(req,res)=>{
    const SID= req.body.SID;
    const number= req.body.number;

    try {
        
        const obj= await eval.findOne({SID});
        obj.panelGrade= number;
        if(obj.mentorGrade !== null){
            obj.finalGrade = (obj.mentorGrade + obj.panelGrade)/2;
        }
        await obj.save();
    res.status(200).send(obj);
    } catch (error) {
        res.status(404).send(error);
    }
})

router.post('/eval/specials',async(req,res)=>{
    const id=req.body.id;

    try {
        const obj= await eval.findById({id});
        
    } catch (error) {
        res.status(404).send(error);
    }
})


module.exports=router;