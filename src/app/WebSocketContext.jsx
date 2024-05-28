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

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('Message received:', data)
      setMessages((prevMessages) => [...prevMessages, data])
    }

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
