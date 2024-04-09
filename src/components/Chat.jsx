import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getAuth } from 'firebase/auth'
import {auth,app} from '../firebase/firebase'
import {doc, setDoc, getFirestore, getDoc, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp} from 'firebase/firestore'
import InputEmoji from 'react-input-emoji'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import sound from "../assets/audio/sound.mp3"

//console.log(hljs)
hljs.registerLanguage('javascript', javascript);

const db = getFirestore(app)



const Chat = ({mensajes,setMensajes,user,setUser,setPersona,persona,setGetChat, texter,showChats}) => {
    const [newMensaje, setNewMensaje] = useState("")

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user){
                
                setPersona(auth.currentUser.toJSON())
                
                setUser(user)
                // saveUser()
            }else{
                setUser(null)
            }
        })
        
    },[])

    const notificacion = (object,user) => {
        //
        console.log(user)

       if (object[object.length - 1].id != user) {
            new Audio(sound).play();
       }
    }
    
    

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const scrollTo = () => {
        if (!texter.current) return;
        texter.current.scrollIntoView({ behavior: "smooth" });
        
      }

    useEffect(() => {
        const consulta = query(collection(db,"prueba","aA69tJ6ozMHrtFjriAl9","sala"), orderBy("timestamp"))
        const unsubscribe = onSnapshot(consulta, snapshot => {
            setMensajes(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()           
            })))
            scrollTo()
            
        })
        
        return unsubscribe
        
    }, [])
    
    

    useEffect(() => {
        const consulta = query(collection(db,"prueba","aA69tJ6ozMHrtFjriAl9","sala"), orderBy("timestamp"))
        const unsubscribe = onSnapshot(consulta, snapshot => {
            setGetChat(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()           
            })))
            
        })
        
        return unsubscribe
        
    }, [])
    //---------------------------------------------

    

    // useEffect(() => {
    //     const q = query(collection(db,"users"))
    //     const prove = onSnapshot(q, snapshot => {
    //         setPersona(snapshot.docs.map(doc => ({
    //             id: doc.id,
    //             data: doc.data()           
    //         })))
    //     })
        
    //     return prove
        
    // }, [])



    // const saveUser = async () => {
    //     await addDoc(collection(db,"users"), {
    //         pid: user.uid,
    //         personaPhotoURL: user.photoURL,
    //         personaDisplayName: user.displayName
    //     })
    // }
    // const sendMensaje2 = async () => {
    //     await addDoc(collection(db,"prueba","aA69tJ6ozMHrtFjriAl9","sala"), {
    //         uid: user.uid,
    //         photoURL: user.photoURL,
    //         displayName: user.displayName,
    //         text: newMensaje,
    //         timestamp: serverTimestamp()
    //     })
        
    //     setNewMensaje("")
    // }
    
      useEffect(() => {
        
      },[])
    //-------------------------------------------------
    

  

    
    

    const sendMensaje = async () => {
        if (newMensaje.trim() != "" && newMensaje !== " " && newMensaje !== "&lt;pre&gt") {
            await addDoc(collection(db,"prueba","aA69tJ6ozMHrtFjriAl9","sala"), {
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName,
                text: newMensaje,
                timestamp: serverTimestamp()
            })
            //sendMensaje2("")
            
            setNewMensaje("")
        }
        
    }

    

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()
    
        try {
            
            const resultado = await signInWithPopup(auth,provider)
        } catch (error) {
            console.log(error)
        }
    }
    

    

   


    //ZONA DE PRUEBA
    
    
    // const authPerfil = getAuth();
    // const perfil1 = authPerfil.currentUser;
    // console.log(perfil1)
    // if (perfil1 !== null) {
    //   // The user object has basic properties such as display name, email, etc.
    //     const data = {
    //         displayName: user.displayName,
    //         email: user.email,
    //         photoURL: user.photoURL,
    //         emailVerified: user.emailVerified
    //     }
    
    //   // The user's ID, unique to the Firebase project. Do NOT use
    //   // this value to authenticate with your backend server, if
    //   // you have one. Use User.getToken() instead.
    //   const uid = user.uid;
    //   setPerfil(data)
    // }
    //console.log(perfil)

    //lRef?.current?.scrollIntoView(true,{behaviour:"auto"})
    
    
    const coding = (msg) => {
        let aux
        //AJUSTAR ESTA LINEA PARAQ QUE CUANDO SE ABRA <-- --> DETECTE LOS ESPACIOS Y LOS SALTOS DE LINEA
          if (msg.includes("&lt;--")) {
              console.log(msg.indexOf("-")+1)
              aux = msg.substring(msg.indexOf("-")+2,msg.lastIndexOf("--&gt;"))
              aux = aux.split("   ")
            //   console.log(aux)
            //   if (msg.includes("\t")) {
                
            //   }
              
             return aux.filter(text => text != "").map((text,index) => (
                <p key={index} className='cursor-pointer line language-javascript '>
                    <span className='code-line'>{index}- </span>{text}
                    
                </p>
                ))
         } 
         //MODIFICAR ESTA LINEA PARA QUE SOLO HAGA SALTOS DE LINEA
         if(msg.includes("</br>")){
            aux = msg.split("</br>")
            return aux.filter(text => text != "").map((text,index) => (
            <p key={index} className='cursor-pointer line'>
                <span className='code-line'>{index}- </span>{text}
            </p>
            ))
          }

        if (msg.includes("http://") || msg.includes("https://")) {
            aux = msg.substring(msg.indexOf("http"))
            aux = aux.split(" ")
            if(aux[0].length > 10){
                return <a className=' text-indigo-700 underline hover:text-indigo-900' href={aux[0]} target='_blank'>{aux[0]}</a>
            }
        }
        return <p className=' text-wrap overflow-clip'> {msg}</p>
    }
    
   
    
    //ZONA DE PRUEBA

  return (
    <div className={`filter w-3/5 w-[70%]`}>
        <div className=' h-screen chat-box w-full containerer' >
            
            { user ? (
                
                <>
                <div  className={`top-bar flex gap-5 transition duration-500 ${showChats ? "scale-0" : "scale-100"}`}>
                        <img src={persona.photoURL} alt="" className=' size-14 rounded-full '/>
                        <p className='text-xl'>{persona.displayName}</p>
                </div>
                   
                <div 
                    className={`text-box transition duration-500 ${showChats ? "scale-0" : "scale-100"}`}
                    
                >
                   
                <ul>
                        {mensajes.map(msg => (
                            <li 
                                key={msg.id}
                                className={`text-bubble  ${msg.data.uid === user.uid ? 'text-right items-start' : 'items-end text-left'}`}
                            >
                                
                                <img src={msg.data.photoURL} className={`w-10 h-10 rounded-full inline-block ${msg.data.uid === user.uid ? 'hidden' : ''}`}/>

                                <span className={`span  text-left text-wrap overflow-clip ${msg.data.uid === user.uid ? 'self' : 'other'} ml-2 `}  >  
                                
                                
                                {//crear una funcio que recibaeste parameto para evaluar si lleva pre, si es asi lo dividirlo en array el imprimir el array
                                }
                                { coding(msg.data.text)}
                                </span>
                                
                            </li>
                            

                        ))}
                        
                </ul>
                   
                    
                    <span ref={texter} id='bottom'></span>    
                    
                </div>
                
                <div className={` user-box box-border ${showChats ? "scale-0" : "scale-100"}`}>
                    {/* <EmojiPicker 
                        onEmojiClick={e => setNewMensaje([...newMensaje, e.emoji])}
                        className='caja-emoji'
                        open={emo}
                        searchDisabled={true}
                    />  */}

                    
                    <div 
                        onSubmit={handleSubmit}
                        className='form'
                    >
                        <InputEmoji 
                            placeholder='Write...'
                            className=' px-2 py-1 write-box'
                            value={newMensaje}
                            onChange={(value) => setNewMensaje(value)}
                            onEnter={sendMensaje}
                            shouldReturn={true}
                        />
                        <div>
                            
                            
                            
                        </div>
                        
                    
                        
                    </div>
                </div>
                
                </>
               
            )
            :
                <button className='loginButtom' onClick={handleGoogleLogin}>Login con google</button>
            }
            </div>
    </div>

  );

}


export default Chat