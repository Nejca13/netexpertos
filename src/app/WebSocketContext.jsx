'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react'

const WebSocketContext = createContext(null)

export const WebSocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [userId, setUserId] = useState(null)
  const ws = useRef(null)

  useEffect(() => {
    if (userId) {
      connectWebSocket(userId)
      console.log('conectando')
    }
    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [userId])

  const connectWebSocket = (id) => {
    ws.current = new WebSocket(`wss://vps-4057595-x.dattaweb.com/chat/ws/${id}`)

    ws.current.onopen = () => {
      console.log('WebSocket connected')
    }

    const addMessageToLocalStorage = (data) => {
      try {
        const storedMessages = JSON.parse(localStorage.getItem(data.id)) || []
        const newMessage = {
          id: data.id,
          message: data.message,
          name: data.name,
          surname: data.surname,
        }
        const updatedMessages = [...storedMessages, newMessage]
        localStorage.setItem(data.id, JSON.stringify(updatedMessages))
        console.log('Message received y guardado en localStorage:', newMessage)
      } catch (error) {
        console.error('Error al manejar localStorage:', error)
      }
    }

    // Función para manejar el evento de recepción de mensajes
    const handleMessageEvent = (event) => {
      try {
        const data = JSON.parse(event.data)
        addMessageToLocalStorage(data)
        setMessages((prevMessages) => [...prevMessages, data])
      } catch (error) {
        console.error('Error al procesar el mensaje:', error)
      }
    }
    ws.current.onmessage = handleMessageEvent

    ws.current.onclose = () => {
      console.log('WebSocket disconnected')
      // Try to reconnect in 5 seconds
      setTimeout(() => connectWebSocket(id), 5000)
    }

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error)
      ws.current.close()
    }
  }

  return (
    <WebSocketContext.Provider
      value={{ ws: ws.current, messages, setUserId, setMessages }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  return useContext(WebSocketContext)
}
