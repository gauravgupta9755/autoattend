const express = require('express')
const fs = require('fs')
const db = require('./db');
const validate = require('./validate')
const app = express();
app.use(express.json())
app.use(express.static('public'))
const fileupload = require('express-fileupload')
app.use(fileupload())

// login --------------------------------------------------------
app.post('/login', (req, res) => {
  if (req.body) {
    if (validate.loginValidation(req.body, res)) {
      db.loginVarification(req.body, res);
    }
    
  }
  else {
    res.send({ status: 11, msg: "something wrong" })
  }
})

// register--------------------------------------------------------------
app.post('/register', (req, res) => {
  if (req.body) {
    
    //registerValidation(req.body,res);
    // registerVarification(req.body,res);
    res.send({ status: 1, msg: "every thing ok" })
  }
  else {
    res.send({ status: 11, msg: "something wrong" })
  }
})


// takeAttendance ---------------------------------------------------
app.post('/takeattendance', async(req, res) => {
  if (req.body) {
    const regId = req.body.regId;
    
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
    const file = req.files.myFile;
    const path = __dirname + "/public/images/" + file.name;
    file.mv(path, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

    });

    const listOfStudent = await db.getstudent(regId);
    
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ img: `http://localhost:3000/images/${file.name}`,list:listOfStudent})
    }

    const result = await fetch("http://127.0.0.1:5000/takeattendance", options)
    
    if (result) {
      const data = await result.json();
      
      if (data.status==1) {
        
          const ans=await db.attendSave(data.enroll, regId)
          
          res.send(ans);
        
      }
      else{
        res.send({stauts:11,msg:"student not matched"})
      }
      
    }
    else{
      res.send({status:11,msg:"something wrong"})
    }
  }
  else{
    res.send({status:11,msg:"data is not comming"});
  }
})


// Add Student ------------------------------------------------
app.post('/encode', async (req, res) => {
  if (!req.body) {
    res.send({ status: 11, msg: "404 data is not uploading" })
  }
  
  const name = req.body.name;
  const enroll = req.body.enroll;
  const regId = req.body.regId

  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.myFile;
 
  const path = __dirname + "/public/images/" + file.name;

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

  });
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ img: `http://localhost:3000/images/${file.name}` })
    // body: JSON.stringify({ img: `http://localhost:3000/images/img.jpg` })
  }

  const result = await fetch("http://127.0.0.1:5000/getencode", options)
  if (result) {
    const data = await result.json();
    
    if (data.status == 1) {

      const resp = await db.saveStudent(data.encode, name, enroll, regId);
      console.log(resp)
      res.send(resp);
    }
    else {
      res.send({status:11,msg:"something worng"});
    }

  }
  else res.send({ status: 11, msg: "something wrong" })

})


// get Register Data ---------------------------------------------------
app.post("/getregdata",async(req,res)=>{
  if(req.body){
    
     const attendance= await db.getAttendance(req.body.regId)
     const studentList=await db.getStudentList(req.body.regId)
     
       res.send({status:1,attendance:attendance,list:studentList})
    
  }
  else{
    res.send({stauts:11,msg:"something wrong"})
  }
})


app.post("/getreg",async(req,res)=>{
    data=await db.getreg(req.body.regIds);
   
   res.send({data:data})
})


app.listen(3000, (err) => {
  if (err) throw err;
  console.log("listig 3000")
})