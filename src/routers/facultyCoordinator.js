
const express= require('express');
const router = new express.Router();
const facultyCoordinator= require('../models/facultyCoordinator');
const sendEmail = require('../send-email/email');



router.post('/',async(req,res)=>{
    const faculty= new facultyCoordinator(req.body) ;
    

    try {
         await faculty.save();
         sendEmail("Faculty Coordinator", req.body.name, req.body.email, req.body.password);
         res.status(200).send(faculty);
    } catch (error) {
        res.status(400).send(error);
    }

    
})


router.get('/',async(req,res)=>{

    try {
        const faculties= await facultyCoordinator.find({});
        res.send(faculties);
    } catch (error) {
        res.status(500).send()
    }
})


router.get('/:id',async(req,res)=>{

    const _id=req.params.id;

    try {
        const faculty=await facultyCoordinator.findById(_id);

        if(!faculty){
            res.status(404).send()
        }
        res.send(faculty)
        
    } catch (error) {
        res.status(500).send()
    }

})



module.exports=router;