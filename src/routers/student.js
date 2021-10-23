const express= require('express');
const router = new express.Router();
const Student= require('../models/student');
const Mentor= require('../models/mentor');
const Admin= require('../models/admin');
const Job= require('../models/job');



router.post('/',async(req,res)=>{
    const student= new Student(req.body) ;
    

    try {
         await student.save();
         res.status(200).send(student);
    } catch (error) {
        res.status(400).send(error);
    }

    
})

router.post('/valid',async(req,res)=>{
    const email=req.body.email;
    const SID=req.body.SID;

    const emailCheck= await Student.findOne({email:email});
    const sidCheck = await Student.findOne({SID:SID});

    if(emailCheck|| sidCheck)return res.send(false);
    return res.send(true);


})

/////////////////////////-------------Filter route(not working )---------------------------------//////////////


// router.post('/filter',async(req,res)=>{

// try {

//     const SID= req.body.SID;
//     const student= await Student.findOne({SID:SID});
//     const cg=student.cgpa;
//     const branch = student.branch;
//     const backlogs= student.backlogs;
//     const filteredJobs= await Job.find({eligibility:{cg : { $lte : cg}, branch:branch, backlogs:{ $lte: backlogs},class10:{ $gte:student.class10},class12:{ $gte:student.class12}}}).exec();
//     res.send(filteredJobs);
    
    
// } catch (error) {
//     res.status(400).send(error);
// }

    
// })

////////////////////////////////////////////////-----------example---------/////////////////////////////

// router.route('/fetchdata').get(function(req,res){

//     employees.find( {{"age"  : {$gt : 25}}, function(err, result){

//         if(err){
//             res.send(err)
//         }
//         else{


//             res.send(result)
//         }

//         });

// })

// {
//     "email":"dhruv@gmail.com",
//     "password":"1234a@ABC",
//     "type":"Student"
    
// }


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

router.get('/',async(req,res)=>{

    try {
        const students= await Student.find({});
        res.send(students);
    } catch (error) {
        res.status(500).send()
    }
})


router.get('/:id',async(req,res)=>{

    const _id=req.params.id;

    try {
        const student=await Student.findById(_id);

        if(!student){
            res.status(404).send()
        }
        res.send(student)
        
    } catch (error) {
        res.status(500).send()
    }

})



router.patch('/:id',async(req,res)=>{

    const updates= Object.keys(req.body);
    const allowedUpdates=['password']
    const isValidOperation= updates.every((update)=>{
         return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid operation!'});
    }


    try {


        const student = await Student.findById(req.params.id);

        updates.forEach((update)=>{
            student[update]=req.body[update];
        })
        await student.save();


        // const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});

        if(!student){
            return res.status(404).send();
        }

        res.send(student)
        
    } catch (error) {
        res.status(400).send(error);
    }
    
})


module.exports=router;