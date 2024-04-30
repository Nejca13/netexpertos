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

export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataValues = Object.fromEntries(new FormData(e.target))
    try {
      const user = await userLogin(formDataValues)
      sessionStorage.setItem('user', JSON.stringify(user))
      window.location.href = '/profile'
    } catch (error) {
      console.error('Error:', error.message)
      throw error
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <Image
          src={NetExpertosLOGO}
          priority={true}
          width={331}
          height={114}
          placeholder='empty'
          alt='NetExpertos Logo'
        />
      </div>
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
        <ButtonSubmit
          text={'INGRESAR'}
          action={(e) => {
            e.preventDefault()
            window.location.href = '/profile'
          }}
        />
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
    </main>
  )
}
