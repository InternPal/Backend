const express= require('express');
const router = new express.Router();
const Student= require('../models/student');
const Mentor= require('../models/mentor');
const Admin= require('../models/admin');
const Job= require('../models/job');




router.post('/login',async(req,res)=>{
    try {
        if(req.body.type ==='Student'){
            const student= await Student.findByCredentials(req.body.email,req.body.password);
            res.send(student);
        }else if(req.body.type ==='Mentor'){
            const mentor= await Mentor.findByCredentials(req.body.email,req.body.password);
            res.send(mentor);
        }else {
            const admin= await Admin.findByCredentials(req.body.email,req.body.password);
            res.send(admin);
        }
        
    } catch (error) {
        res.status(400).send();
    }
})



module.exports=router;