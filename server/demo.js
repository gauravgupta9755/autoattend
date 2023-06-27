const express= require('express')
const app =express();
app.use(express.json())

app.post("/check",(req,res)=>{
    if(req.body)console.log(req.query);
    res.send({msg:"hello"});
})
app.listen(3000,(err)=>{
    if(err)throw err;
    console.log("listig 3000")
 })

 