//jsonwebtoken import
const jwt=require('jsonwebtoken')

//import db
const db=require('./db')

database:any ={
    1:{userId:1,username:"meena",pswd:1,event:[]},
    2:{userId:2,username:"neena",pswd:2,event:[]},
    3:{userId:3,username:"aneena",pswd:3,event:[]}
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
//add event

  const addEvent=(userId,date,text)=>{
  
    var date = date;
    date = date.split("-").reverse().join("-");
    
    return db.User.findOne({userId})
    .then(result=>{
      if(result){
        
        result.event.push(
          {
            date,
            text
          }
        )
       // console.log(database);
   result.save()
  return  {
    statusCode:200,
    status:true,
    message:"successfully saved"

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

    const viewdetails=(userId)=>{
      return db.User.findOne({userId})
      .then(user=>{
        if(user){
          return  {
            statusCode:200,
            status:true,
            event:user.event
          } 
        }
        else{
          return  {
            statusCode:401,
            status:false,
            message:"user does not exist"
          }
        }
      })
    }

    const deleteAcc=(userId)=>{
      return db.User.deleteOne({userId})
      .then(user=>{
        if(!user){
          return  {
            statusCode:401,
            status:false,
            message:"Operation Invalid"
          }
        }
        else{
          return  {
            statusCode:200,
            status:true,
            message:"Account Number deleted successfully"
        
          }
        }
      })
    }
   module.exports={
       register,
       login,
       addEvent,
       viewdetails,
       deleteAcc
   }