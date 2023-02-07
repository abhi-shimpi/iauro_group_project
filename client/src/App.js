import React from 'react'
import {Route,Routes} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';


const Routing=()=>{

  return(
    <Routes>
     

     <Route path="/login" element={<Login/>} />

     <Route path="/register" element={<Register/>} />

     {/* <Route path="/logout" element={<Logout/>} />     */}

       
    </Routes>
  )
   
}




const App = () =>{
  return (
    <>
      <Navbar/>
      <Routing />
    </>
  )
}

export default App;
