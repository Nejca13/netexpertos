'use client'
import { useWebSocket } from '@/app/WebSocketContext'
import React, { useEffect, useState } from 'react'
import ICO_NETEXPERTOS from '@/assets/images/ICONOS/ICO-NETEXPERTOS.png'

const NotificationButton = () => {
  const { messages } = useWebSocket()
  const [permission, setPermission] = useState(Notification.permission)

  useEffect(() => {
    if (permission === 'default') {
      Notification.requestPermission().then((perm) => {
        setPermission(perm)
      })
    }
  }, [permission])

  const sendNotification = () => {
    if (permission === 'granted') {
      new Notification('NetExpertos', {
        body: 'Esta es una notificación de escritorio.',
        icon: '/ICO-NETEXPERTOS.png',
        requireInteraction: false,
      })
    } else {
      alert('Permiso para notificaciones no concedido.')
    }
  }

  return (
    <div>
      <button onClick={sendNotification}>Enviar Notificación</button>
    </div>
  )
}

export default NotificationButton
