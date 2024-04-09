
import React from "react"
import {useState,useEffect,useRef} from 'react'
import Usuarios from "./Usuarios"
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getAuth} from 'firebase/auth'
import {auth} from '../firebase/firebase'



const Header = ({mensajes,user,persona,getChat,texter,setShowChats}) => {
  
  

  return (
    <div className=" shadow-xl w-[30%] h-screen overflow-hidden overflow-y-auto p-2 lateral">
      { user ? (
        <>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 transition-all hover:duration-1000 hover:bg-gradient-to-l from-cyan-500 to-blue-500 text-white py-1 px-3 rounded-full signOut" onClick={ () => auth.signOut()}>
            x
          </button>
          
           
          {
            
          getChat.map( chat => 
            <Usuarios
              texter={texter}
              key={chat.id}
              chat={chat}
              setShowChats={setShowChats}
            />
            )
            
          
          
          
          /* {
          
          persona.map(userDate => (
                
              <Usuarios
                key={userDate.id}
                userDate={userDate}
              /> 
                
            ))
          } */}
           
       </> 
      ) : <></>}
      
     
     
    </div>
  )
}

export default Header

// Posible glujo para obtener los usuarios, hacer un bucle que itere el objeto de la sala, dentro de ese bucle hacer otro bucle que itere la misma sala y compare el valor del padre de la sala con el valor del bucle padre y retorne e