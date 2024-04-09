import React from "react"
import { useState, useRef } from "react"
import Header from "./components/Header"
import Chat from "./components/Chat"
import "./css/style.css"




function App() {

  
  const [mensajes, setMensajes] = useState([])
  const [user, setUser] = useState([])
  const [persona,setPersona] = useState([])
  const [getChat,setGetChat] = useState([])
  const [showChats,setShowChats] = useState(true)
  const texter = useRef(null);
  

  return (
    <>
      {/* <button onClick={handleGoogleLogin}>Iniciar sesion con Google</button> */}
      <div className="flex w-full">
        <Header 
          mensajes={mensajes}
          user={user}
          persona={persona}
          getChat={getChat}
          texter={texter}
          setShowChats={setShowChats}
        />
        <Chat 
          mensajes={mensajes}
          setMensajes={setMensajes}
          user={user}
          setUser={setUser}
          setPersona={setPersona}
          persona={persona}
          setGetChat={setGetChat}
          texter={texter}
          showChats={showChats}

          //sperfil={perfil}
          //setPerfil={setPerfil}
        />
      </div>
    </>
  )
}

export default App
