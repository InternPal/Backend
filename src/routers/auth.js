const express= require('express');
const router = new express.Router();
const Student= require('../models/student');
const Mentor= require('../models/mentor');
const Admin= require('../models/admin');
const Job= require('../models/job');
const facultyCoordinator=require('../models/facultyCoordinator');
const industryCoordinator=require('../models/industryCoordinator');




router.post('/login',async(req,res)=>{
    try {
        if(req.body.type ==='Student'){
            const student= await Student.findByCredentials(req.body.email,req.body.password);
            res.send(student);
        }else if(req.body.type ==='facultyCoordinator'){
            const faculty= await facultyCoordinator.findByCredentials(req.body.email,req.body.password);
            res.send(faculty);
        }else if(req.body.type ==='industryCoordinator'){
            const industry= await industryCoordinator.findByCredentials(req.body.email,req.body.password);
            res.send(industry);
        }
        else {
            const admin= await Admin.findByCredentials(req.body.email,req.body.password);
            res.send(admin);
        }
        
    } catch (error) {
        res.status(400).send();
    }
})



module.exports=router;