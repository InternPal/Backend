const express= require('express');
const cors= require('cors');
require('./db/mongoose.js');
require('dotenv').config()



const Student = require('./models/student');
const Job= require('./models/job');
const Admin= require('./models/admin');
const Mentor= require('./models/mentor');
const jobApplication= require('./models/jobApplication');
const eval= require('./models/eval');
const faculty=require('./models/facultyCoordinator');
const industry=require('./models/industryCoordinator');


const studentRoutes=require('./routers/student');
const jobRoutes=require('./routers/job');
const mentorRoutes= require('./routers/mentor');
const adminRoutes= require('./routers/admin');
const authRoutes =require('./routers/auth');
const jobAppRoutes= require('./routers/jobApplication');
const evalRoutes=require('./routers/eval');
const facultyCoordinatorRoutes = require('./routers/facultyCoordinator');
const industryCoordinatorRoutes = require('./routers/industryCoordinator');


const app=express();
const port= process.env.PORT|| 3000;

app.use(cors({
    origin: "http://localhost:3001",
    credentinals: true
  }))


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });





app.use(express.json({limit: '100mb'}));

app.use("/students",studentRoutes);
app.use("/jobs",jobRoutes);
app.use("/mentors",mentorRoutes);
app.use("/admins",adminRoutes);
app.use("/facultyCoordinator", facultyCoordinatorRoutes);
app.use("/industryCoordinator", industryCoordinatorRoutes)
app.use(authRoutes);
app.use(jobAppRoutes);
app.use(evalRoutes);





// ROUTES FOR STUDENT------------------------------------------------------------------------------------------//



//ROUTES FOR JOB------------------------------------------------------------------------------------------------





app.listen(port,()=>{
    console.log('Server running at port '+port);
})