'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import TEL from '@/assets/images/ICONOS/ICO-TEL.svg'
import SEND from '@/assets/images/ICONOS/ICO-SEND.svg'
import EMOJI from '@/assets/images/ICONOS/ICO-EMOJI.svg'
import { useParams, useRouter } from 'next/navigation'
import SlideToUnlock from '@/components/SlideToUnlock/SlideToUnlock'
import IsAuth from '@/components/Auth/IsAuth'
import EmojiPicker from 'emoji-picker-react'

const Chat = () => {
  const { _id } = useParams()
  const [prof, setProf] = useState()
  const [messages, setMessages] = useState([])
  const [showEmojis, setShowEmojis] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const router = useRouter()
  const textareaRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    textareaRef?.current?.focus()
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    setShowEmojis(false)
    if (currentMessage.trim() !== '') {
      setMessages([...messages, { id: 0, message: currentMessage }])
      setCurrentMessage('')

      const PopMensajeSaliente = document.querySelector('#popMensajeSaliente')
      PopMensajeSaliente.volume = 0.3
      PopMensajeSaliente.play()
    }
  }
  useEffect(() => {
    setProf(JSON.parse(localStorage.getItem(_id)))
  }, [])

  return (
    <div className={styles.container}>
      <audio src='/sounds/Pop2.mp3' id='popMensajeSaliente'></audio>
      {prof ? (
        <>
          <div className={styles.header}>
            <div className={styles.div}>
              <Image
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABYklEQVR4nO2YsUrDQBiAvxJ0cHLRp3Bxk9AsfQyHDAkFoWTqO/g++gAOxcmHyKTgZoKILsnJQQuhTW0uNO3/y31w2w3fB3/ukoDH4/H8B+6Ab8AA78AVipgvxZvLRuiSn06nJs/zZoR4stFoVFvZNE1NVVXGoiUga5PXEpBtk9cQkP0lLz1gtktecsAM2CkvNWDePCrrut4qvxYwxHoeVN4yHo+Hjtj/2BwCHANEybsGiJN3Cbh1nXlpAR92UxzHouS7BpzZDUEQmLIsjTToEHCxCiiKwmgMOF9t0jpCJ0Cl/SF+at56SZKoO0avgS+JEThcZBHw2Yw49jgtFgvnV4neEWEYinmZi/pEDCz/hiMT12di4IB714DWiI6flPtcr0v5U3qyMU4aP+qjLhGSAzpFSA/YGaEhYOsRq+3nbrQe0ffCOSYbR+xy/aCISUvEI8q4AV6AEngALo8t5PF4PByEX602SwjUn4tkAAAAAElFTkSuQmCC'
                width={35}
                height={35}
                alt='Flecha atras'
                onClick={() => {
                  localStorage.removeItem(_id)
                  router.back()
                }}
              />
              <Image
                className={styles.imagenPerfil}
                src={prof.foto_perfil}
                height={43}
                width={43}
                alt='Imagen de perfil'
              />
              <p className={styles.username}>
                {prof.nombre} {prof.apellido}
              </p>
            </div>
            <Image
              className={styles.iconoLlamada}
              src={TEL}
              height={40}
              width={40}
              alt='Imagen de perfil'
            />
          </div>
          <div className={styles.chats} ref={containerRef}>
            {messages.map((message, index) => {
              if (message.id === 0) {
                return (
                  <p key={index} className={styles.mensajeSaliente}>
                    {message.message}
                  </p>
                )
              }
              if (message.id === 1) {
                return (
                  <p key={index} className={styles.mensajeEntrante}>
                    {message.message}
                  </p>
                )
              }
            })}
          </div>
          <div className={styles.containerInput}>
            <textarea
              ref={textareaRef}
              className={styles.input}
              cols={18}
              autoFocus={true}
              value={currentMessage}
              onChange={(e) => {
                setCurrentMessage(e.target.value)
              }}
              placeholder='Escribe tu mensaje'
            />
            <div className={styles.containerButtons}>
              <button className={styles.botonEnviar} onClick={handleSend}>
                <Image src={SEND} alt='icono enviar' height={30} />
              </button>
              <button
                className={styles.botonEnviar}
                onClick={() => {
                  setShowEmojis(!showEmojis)
                }}
              >
                <Image src={EMOJI} height={30} alt='icono emojis' />
              </button>
            </div>
            <div className={styles.containerEmojis}>
              <EmojiPicker
                open={showEmojis}
                onEmojiClick={(e) =>
                  setCurrentMessage(currentMessage + '' + e.emoji)
                }
                emojiStyle='native'
                lazyLoadEmojis={true}
                searchDisabled={true}
                width={300}
                height={300}
              />
            </div>
          </div>
          <SlideToUnlock />
        </>
      ) : null}
    </div>
  )
}

export default IsAuth(Chat)
