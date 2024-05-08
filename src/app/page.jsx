'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { Inputs } from '@/components/FormComponents/FormComponents'
import Image from 'next/image'
import NetExpertosLOGO from '../assets/images/NetExpertosLOGO.svg'
import ButtonSubmit from '@/components/Buttons/ButtonSubmit/ButtonSubmit'
import ButtonSignInWithGoogle from '@/components/Buttons/ButtonSignInWithGoogle/ButtonSignInWithGoogle'
import FormContainer from '@/components/Containers/FormContainer'
import { userLogin } from '@/services/api/authUsuarios'
import Container from '@/components/Containers/Container'
import LogoNetExpertos from '@/components/ui/Logo/LogoNetExpertos'
import { useState } from 'react'
import ModalError from '@/components/ui/Modals/ModalError/ModalError'
import { useRouter } from 'next/navigation'
import { addUser } from '@/utils/indexedDataBase'

export default function Home() {
  const [showModalError, setShowModalError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataValues = Object.fromEntries(new FormData(e.target))
    try {
      const data = await userLogin(formDataValues)

      const saveUser = await addUser(data)

      if (saveUser) {
        router.push('/profile')
      }
    } catch (error) {
      if (error) {
        console.log(error)
        setShowModalError(true)
        setErrorMessage('Ocurrio un error inesperado')
      }
    }
  }

  return (
    <Container>
      {showModalError && (
        <ModalError
          errorMessage={errorMessage}
          setShowModalError={setShowModalError}
        />
      )}
      <LogoNetExpertos width={300} height={90} />
      <FormContainer method={'POST'} onSubmit={(e) => handleSubmit(e)}>
        <Inputs
          id={'userName'}
          name={'username'}
          text={'Usuario'}
          type={'text'}
        />
        <Inputs
          id={'password'}
          name={'password'}
          text={'Contraseña'}
          type={'password'}
        />
        <ButtonSubmit text={'INGRESAR'} />
        <div className={styles.resetPassword}>
          <p className={styles.p}>
            ¿Olvidaste tu contreseña?{' '}
            <Link className={styles.link} href='/reset-password'>
              Ingresa aqui
            </Link>
          </p>
        </div>
        <ButtonSignInWithGoogle />
      </FormContainer>

      <div className={styles.register}>
        <p className={styles.p}>¡Quiero registrarme!</p>
        <div className={styles.containerButtons}>
          <Link className={styles.registerButtons} href='/create-user-account'>
            Usuario
          </Link>
          <Link
            className={styles.registerButtons}
            href='/create-expert-account'
          >
            Experto
          </Link>
        </div>
      </div>
    </Container>
  )
}
