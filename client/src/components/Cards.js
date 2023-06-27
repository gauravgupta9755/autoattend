import React, { useEffect } from 'react'
import { useState } from 'react'


export const Cards = (props) => {
  const getdata=async()=>{
    const reg=props.login.data.regIds;
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({regIds:reg})
        }
  
        const res=await fetch("/getreg",options);
        const result=await res.json()
        console.log(result)

        setRegData(result.data)

  }
  
  const [regdata,setRegData]=useState([])
  useEffect(() => {
    getdata()
  }, []);
  
 
    const openReg=(e)=>{
        console.log(e.target.value)
        props.setReg({status:"reg",regId:e.target.value,text:e.target.innerText})
        props.setTestAdd("reg")
        
    }
  return (
    <>
    {
      regdata.map((item)=>{

        return <button type="button" className="btn btn-secondary btn-lg m-4" value={item.regId} onClick={openReg}>{item.st}</button>

      })
    }
    </>
  )
}

 export default Cards
