const express= require('express');
const router = new express.Router();
const Student= require('../models/student');
const Mentor= require('../models/mentor');
const Admin= require('../models/admin');
const Job= require('../models/job');
const jobApplication=require('../models/jobApplication');



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

/////////////////////////-------------Filter route---------------------------------//////////////


router.get('/filter/:id',async(req,res)=>{


    const SID= req.params.id;
    const student= await Student.findOne({SID:SID});

    if(!student){
        throw new Error('The student does not exist');
    }
    
    
    const cg=student.cgpa;
    const branch = student.branch;
    const backlogs= student.backlogs;
    const class10= student.class10;
    const class12= student.class12;
    // const filteredJobs= await Job.find({eligibility:{"cg" : { $lte : cg}, branch:branch, backlogs:{ $lte: backlogs},class10:{ $gte:student.class10},class12:{ $gte:student.class12}}}).exec();
    // res.send(filteredJobs);
   
    const d = new Date();
    let year = d.getFullYear()
    console.log(year);

    Job.where('eligibility.cg').lte(cg)
        .where('eligibility.branch').equals(branch)
        .where('eligibility.backlogs').lte(backlogs)
        .where ('eligibility.class10').lte(class10)
        .where ('eligibility.class12').lte(class12)
        .where('jobType').equals(student.semester === 5 ? 'Intern' : 'FullTime')
        .where('year').equals(year)
            .exec(function(err,result){
         if(err){
             res.send(err);
         }else{
             res.send(result);
         }   
    })


    // User.where('age').gte(5).lte(200)
    //     .exec(function (err, result) {
    // if (err){
    //     console.log(err)
    // }else{
    //     console.log("Result :", result) 
    // }
})
    


    


////////////////////////////////////////////////-----------example---------/////////////////////////////



// {
//     "email":"dhruv@gmail.com",
//     "password":"1234abc@ABC",
//     "type":"Student"
    
// }





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
////////////////////////////-----------offer accepted---------------/////////////////////////////

router.post('/offer',async(req,res)=>{
    const SID=req.body.SID;
    const jobID=req.body.jobID;

    try {
        const jobApp= await jobApplication.findOne({SID,jobID});
        jobApp.status="ACCEPTED";
        await jobApp.save();
        console.log(jobApp);
        const student= await Student.findOne({SID});
        student.offer=true;
        await student.save();
        res.status(200).send(student)
    } catch (error) {
        res.status(404).send(error)
    }
    
})





////////////////////////////-------------jobApp(student applied to how many companies)------------------///////////////////////

router.get('/jobApp/:id', async(req,res)=>{
      const SID= req.params.id;
    
      
      try {
        const companies= await jobApplication.find({SID})
        res.status(200).send(companies);
          
      } catch (error) {
          res.status(500).send(error);
      }

    //   jobApplication.where('SID').equals(SID)
    //                    .exec(function(err,result){
    //                         if(result){
    //                             companies.push(result.jobCompany)
    //                         }
    //                    })
    //     res.status(200).send(companies);

      

})



router.get('/:sem/:of',async(req,res)=>{
    const semester= req.params.sem;
    const offer= req.params.of;

    try {
        const students=await  Student.find({semester,offer})
        res.status(200).send(students);
    } catch (error) {
        res.status(500).send(error)
    }

})




module.exports=router;