const express= require('express');

require('./db/mongoose.js');
const Student = require('./models/student');
const Job= require('./models/job');
const Admin= require('./models/admin');
const Mentor= require('./models/mentor');


const studentRoutes=require('./routers/student');
const jobRoutes=require('./routers/job');
const mentorRoutes= require('./routers/mentor');
const adminRoutes= require('./routers/admin');


const app=express();
const port= process.env.PORT|| 3000;



app.use(express.json());
app.use("/students",studentRoutes);
app.use("/jobs",jobRoutes);
app.use("/mentors",mentorRoutes);
app.use("/admins",adminRoutes);





// ROUTES FOR STUDENT------------------------------------------------------------------------------------------//



//ROUTES FOR JOB------------------------------------------------------------------------------------------------





app.listen(port,()=>{
    console.log('Server running at port '+port);
})