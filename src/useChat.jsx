import React from 'react'
import { useState, useEffect} from 'react'
import { db } from './firebase/Firebase'


const useChat = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [mensajes, setMensajes] = useState([])

    useEffect(
        () => {
            const sobrescribir = db.collection('mensajes').onSnapshot(
                snapshot => {
                    setLoading(false)
                    setMensajes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
                },
                err => {
                    setError(err)
                }
            );
            return () => sobrescribir()
        },
        [setMensajes]
    )

  return {error, loading, mensajes,}
}

export default useChat
