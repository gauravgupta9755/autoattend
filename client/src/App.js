import './App.css';
import Nav from './components/Nav';
import {Cards} from './components/Cards';
import { useState, useEffect } from 'react';
import {Login} from './components/Login.jsx';
import {Nav2} from './components/Nav2';
import Reg from './components/Reg';
import AddStu from './components/AddStu';
import TestSys from './components/TestSys';
function App() {
  
  // const [reg,setReg]=useState({status:'card'})
  const [login,setLogin]=useState({status:false,data:{}})
  const [reg,setReg]=useState({status:'card',regId:""})
  const [testAdd,setTestAdd]=useState("login")
 
  if(testAdd=="reg")return(<><Nav reg={reg} setTestAdd={setTestAdd} setReg={setReg}></Nav><Nav2 setTestAdd={setTestAdd} testAdd={testAdd} display="block"></Nav2><Reg reg={reg}></Reg></>)
  if(testAdd=='add')return (<><Nav reg={reg} setTestAdd={setTestAdd} setReg={setReg}></Nav><Nav2 setTestAdd={setTestAdd} testAdd={testAdd }reg={reg} display="none"/><AddStu  reg={reg} setReg={setReg}></AddStu></>)
  if(testAdd=='test')return(<><Nav reg={reg} setTestAdd={setTestAdd} setReg={setReg}></Nav><Nav2 setTestAdd={setTestAdd} testAdd={testAdd} reg={reg} display="none"/><TestSys  reg={reg} setReg={setReg}></TestSys></>)
  if(testAdd=="card"||login.status)return (<><Nav reg={reg} setReg={setReg} setTestAdd={setTestAdd}></Nav><Nav2 setTestAdd={setTestAdd} testAdd={testAdd} reg={reg} display="none"/><Cards setLogin={setLogin}setTestAdd={setTestAdd} login={login} setReg={setReg}></Cards></>)
  return <><Login setLogin={setLogin}></Login></>
  
  

}

export default App;
