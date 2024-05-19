'use client'
import { useEffect } from 'react'
import { useAuth } from '../userContext'
import ContainerBlanco from '@/components/Containers/ContainerFondoBlanco'
import SimpleLoader from '@/components/Loaders/SimpleLoader'
import FormContainer from '@/components/Containers/FormContainer'
import LogoNetExpertos from '@/components/ui/Logo/LogoNetExpertos'
import styles from './page.module.css'
import NavBar from '@/components/Navbar/NavBar'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [auth, setAuth] = useAuth()
  const router = useRouter()

  const handleUser = async (code) => {
    const response = await fetch(
      'https://vps-4057595-x.dattaweb.com/auth-google/callback'
    )
  }
  /* useEffect(() => {
    console.log(auth)
  }, []) */
  return (
    <ContainerBlanco>
      <NavBar onClick={() => router.back()} />
      <FormContainer>
        <LogoNetExpertos width={200} />
        <div className={styles.container}>
          {auth && (
            <p className={styles.p}>
              Hola <strong className={styles.strong}>{auth.given_name}</strong>!
            </p>
          )}
          <p className={styles.p}>
            Estamos emocionados de anunciar que estamos trabajando arduamente
            para traerles una nueva y emocionante funcionalidad: la posibilidad
            de iniciar sesión y registrarse con Google. Sabemos que muchos de
            ustedes han estado esperando esta mejora, y estamos comprometidos a
            brindársela lo antes posible.
          </p>
          <p className={styles.p}>
            Les pedimos un poco de paciencia mientras ultimamos los detalles
            para asegurar que su experiencia sea fluida y segura. ¡Pronto
            tendremos más noticias para compartir!
          </p>
          <p className={styles.p}>
            ¡Gracias por su apoyo continuo y por ser parte de nuestra comunidad!
          </p>
          <p>
            El equipo de{' '}
            <strong className={styles.strong}>
              <a className={styles.a} href='http://securityandsystem.com/'>
                @Security and System
              </a>
            </strong>
          </p>
        </div>
        <SimpleLoader />
      </FormContainer>
    </ContainerBlanco>
  )
}

export default Page
