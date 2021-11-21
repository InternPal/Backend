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


router.post('/eval/specials',async(req,res)=>{
    const id=req.body.id;
    const key = req.body.key;
    const value = req.body.value;
    try {
        let obj= await eval.findById(id);
        obj[key] = value;
        await obj.save();
        res.status(200).json({'success': 'new documents added!', 'data': obj});

    } catch (error) {
        res.status(404).send(error);
    }
})


module.exports=router;