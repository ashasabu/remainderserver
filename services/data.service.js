//jsonwebtoken import
const jwt=require('jsonwebtoken')

//import db
const db=require('./db')

database:any ={
    1000:{userId:1000,username:"meena",pswd:1000,event:[]},
    1001:{userId:1001,username:"neena",pswd:1001,event:[]},
    1002:{userId:1002,username:"aneena",pswd:1002,event:[]}
  }

  const register= (username,userId,pswd)=>{
   
    //asynchronous
    return db.User.findOne({userId})
    .then(user=>{
      if(user){
        //user exist
        return {
          statusCode:401,
          status:false,
          message:"Account number already exist"
        }
      }
else{
  const newUser=new db.User({
    userId,
    username,
    pswd,
     event:[]
  })
  newUser.save()
  return  {
    statusCode:200,
    status:true,
    message:"Successfully registered...Please login"

  } 
}
    })
 
    
   }
   const login=(userId,pswd)=>{
    //assynchronous 
   return db.User.findOne({userId,pswd})
    .then(user=>{
      if(user){
        currentUser=user.username
        currentId=userId
        //token generate
        const token=jwt.sign({
          currentId:userId
        },'supersecret123456789')
      return {
        statusCode:200,
        status:true,
        message:"Login Sucessfull...",
        token:token,
        currentId,
        currentUser
      } 
      }
      else{
        return{
          statusCode:401,
        status:false,
        message:"Invalid Creditials"
        }
       
      }
    })
  }
   module.exports={
       register,
       login
   }