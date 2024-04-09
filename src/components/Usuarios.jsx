import React, { useEffect, useState, useRef } from 'react'


const Usuarios = ({chat,lastMessage,texter,setShowChats}) => {
  
  const toggleChatAndBaseline = () => {
    setShowChats(false)
    setTimeout(() => {
      texter.current.scrollIntoView()
    }, 200);
  }

  
  
  return (
    <div 
    className='
        flex py-3 
        px-1 rounded-xl 
        lastTexto
        hidde
        after:bg-slate-500
    '
    onClick={toggleChatAndBaseline}

    >
      <img 
        className='rounded-full size-16' 
        src='https://appsfactory.cat/wp-content/uploads/2016/05/cropped-Logo_apps_factory.png' 
        alt="" 
      />
      <div className='mt-2 ml-3  truncate w-full'>
        <p className='font-bold text-lg w-4/5 user-name truncate box-border'>
          {chat.displayName} 
          Chat apps factory 2024
        </p>
        <p className='text-sm w-4/5  truncate'>
          {chat.data.text}
        </p>
      </div>
    </div>
  )
}

export default Usuarios
