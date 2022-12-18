import cors from 'cors';
import express from 'express';
import User from './firebaseconfig.js';
import * as dotenv from 'dotenv';

dotenv.config();


const app=express();
app.use(express.json());
app.use(cors());


app.listen(8000,()=>{
 console.log("App listening at port");
});


//post request
app.post("/create",async(req,res)=>{
 const data=req.body;
 console.log("User Data : ",data); 
 try{
  const result = await User.add(data);
  if(result)
  {
   console.log("Data Added Successfullly");
   return res.send({msg:"Data Addded Successfull"});
  }
  else
  {
   console.log("Failed to Add data");
   return res.send({ msg: "Failed to Data"});

  }
 }
 catch(error)
 {
  console.log("Error : ",error);
  res.send({msg:error});
 }
});

app.get("/allusers", async (req, res) => {
 try {
  const snapshot = await User.get();
  if (snapshot) 
  {  
      // in order to get single data
    // const list=snapshot.docs[0].data();

    //use mapp function to get all json data
   const list=snapshot.docs.map((doc)=>({id:doc.id, ...doc.data() }));
   console.log(list);
   return res.send(list);
  }
  else {
   console.log("Failed to Add data");
   return res.send({ msg: "Failed to Data" });

  }
 }
 catch (error) {
  console.log("Error : ", error);
  res.send({ msg: error });
 }
});


app.post("/update", async (req, res) => {
 try {
  //delete the id from request body and deleteing the data
  const id=req.body.id;
  delete req.body.id;
  const data=req.body;
  console.log(req.body);
  await User.doc(id).update(data);
  console.log("Data Updated Successfullly");
  return res.send({ msg: "Data Updated"});
 }
 catch (error) {
  console.log("Error : ", error);
  res.send({ msg: error });
 }

});

app.delete("/delete", async (req, res) => {
 try {
  const id = req.body.id;
  await User.doc(id).delete();
  console.log("Data Deleted Successfullly");
  res.send({ msg: "Data Deleted" });
 }
 catch (error) {
  console.log("Error : ", error);
  res.send({ msg: error });
 }
});
