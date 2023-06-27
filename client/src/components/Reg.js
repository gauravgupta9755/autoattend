import React, { useState,useEffect } from 'react';
import {Table} from './Table';

export const Reg = (props) => {
  console.log(props)
  const [data,setData]=useState({enroll:{},list:[]})
  const getdata=async()=>{
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({regId:props.reg.regId})
      }

      const res=await fetch("/getregdata",options);
      const result=await res.json()
     
      setData(result.data)
      let enroll={};
      const attendance=result.attendance.attendance;
      
      for(let i=0;i<attendance.length;i++){
        
        const arr=attendance[i].enroll
        
        for(let j=0;j<arr.length;j++){
          if(enroll[arr[j]]){
            enroll[arr[j]]++;
          }
          else{
            enroll[arr[j]]=1;
          }
          
        }
      }
      setData({enroll:enroll,list:result.list,total:result.attendance.attendance.length})
      
      
  }
  const fun=async()=>{
    const file = document.getElementById("file");
    const formData = new FormData()
    formData.append('myFile', file.files[0])
    formData.append("regId",props.reg.regId)
    let options = {
      method: 'POST',
      body: formData
      }
      const res=await fetch("/takeattendance",options);
      const result=await res.json()
      console.log(result)
      alert(result.msg)
  }
  useEffect(() => {
   getdata()
  }, []);
  return (
    <>
    <h4 className='m-3'>{props.reg.text}</h4>

    <div className='d-flex justify-content-center'><input type="file" id="file"></input><button onClick={fun} type="button" className="btn  btn-lg shadow rounded" href='/'  style={{backgroundColor:"#57B894"}}>Take Attendance</button></div>

     <Table data={data} />
    </>
  )
}

export default Reg

