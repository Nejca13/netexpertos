'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { Inputs } from '@/components/FormComponents/FormComponents'
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
import ModalLoading from '@/components/ui/Modals/ModalLoading/ModalLoading'

export default function Home() {
  const [showModalError, setShowModalError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataValues = Object.fromEntries(new FormData(e.target))
    try {
      setIsLoading(true)
      const data = await userLogin(
        formDataValues,
        setErrorMessage,
        setIsLoading
      )
      const saveUser = await addUser(data)
      console.log(saveUser)
      if (saveUser) {
        router.push(`/profile/${data.user_data._id}`)
      }
    } catch (error) {
      if (error) {
        setIsLoading(false)
        console.log(error)
        setShowModalError(true)
        setErrorMessage('Ocurrio un error inesperado')
      }
    }
  }

  return (
    <Container>
      {isLoading && <ModalLoading message={'Iniciando sesion...'} />}
      {errorMessage && (
        <ModalError
          errorMessage={errorMessage}
          setShowModalError={setErrorMessage}
        />
      )}
      <LogoNetExpertos width={300} height={90} />
      <FormContainer method={'POST'} onSubmit={(e) => handleSubmit(e)}>
        <Inputs
          id={'userName'}
          name={'username'}
          text={'Correo'}
          type={'text'}
          errorMessage={'El correo ingresado es invalido!'}
        />
        <Inputs
          id={'password'}
          name={'password'}
          text={'Contraseña'}
          type={'password'}
          errorMessage={'Contraseña invalida!'}
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
