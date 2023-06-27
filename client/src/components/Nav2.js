import React, { useEffect, useState } from "react";
import AddStu from "./AddStu";
import Reg from "./Reg";
import TestSys from "./TestSys";

export const Nav2 = (props) => {
  console.log(props)
   const fun=(e)=>{
    console.log(e.target.value)
props.setTestAdd(e.target.value)
   }
  
 useEffect(() => {
  const btn=document.getElementById("addstd")
 
  
  if(props.testAdd!="reg")btn.style.display="none"
  else btn.style.display="block"
 
 }, []);
 const btn=document.getElementById("addstd")
 if(btn){
  console.log(props.reg)
  if(props.testAdd!="reg")btn.style.display="none"
  else btn.style.display="block"
 }
 
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary p-0">
        <div class="container-fluid  shadow">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <button class="nav-link active" value="card" aria-current="page" onClick={fun}>
                  Attendance
                </button>
              </li>
              <li class="nav-item">
                <button class="nav-link" value="add" id="addstd" onClick={fun}>Add Student</button>
              </li>
              <li class="nav-item">
                <button class="nav-link" value="test" onClick={fun}>Test System</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      

    </>
  );
};

export default Nav2;
