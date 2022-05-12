// import express
const express=require('express')

//jsonwebtoken import
const jwt=require('jsonwebtoken')
//import cors
const cors=require('cors')
//import data.service
const dataService=require('./services/data.service')
//create server app using express
const app=express()
//use cores in server app
app.use(cors({

    origin:'http://localhost:4200'
}))

//to parse json data
app.use(express.json())
//set port number
app.listen(3000,()=>{
    console.log("server started at 3000");
})


//jwtMiddleware
// const jwtMiddleware=(req,res,next)=>{
//     try{
//         const token=req.headers["x-access-token"]
//         const data=jwt.verify(token,'supersecret123456789')
//         req.currentId=data.currentId
//         next()
//     }
//     catch{
//         res.status(401).json({
//             status:false,
//             message:"Please login!!!"
//         })
//     }
// }
//reg api
app.post('/register',(req,res)=>{
    dataService.register(req.body.username,req.body.userId,req.body.pswd)
    .then(result=>{
      res.status(result.statusCode).json(result)
  
    })
  })

  //login api 
app.post('/login',(req,res)=>{
    dataService.login(req.body.userId,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    
      })
  })