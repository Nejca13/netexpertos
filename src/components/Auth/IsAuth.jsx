'use client'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import SimpleLoader from '../Loaders/SimpleLoader'
import ContainerBlanco from '../Containers/ContainerFondoBlanco'
import { getUser } from '@/utils/indexedDataBase'

export default function isAuth(Component) {
  return function IsAuth(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [auth, setAuth] = useState(null)

    const setUser = async () => {
      const authValue = await getUser()
      setAuth(authValue.user_data)
    }

    useEffect(() => {
      setUser()
    }, [])

    useEffect(() => {
      if (auth === null) {
        setTimeout(() => {
          setIsLoading(false)
        }, 5000)
        // Si auth aún no se ha establecido, no hagas nada
        return
      }

      if (!auth) {
        redirect('/')
      }
    }, [auth])

    if (auth === null) {
      // Si auth aún no se ha establecido, muestra un estado de carga o algo similar
      return isLoading === true ? (
        <div
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SimpleLoader />
        </div>
      ) : (
        <h1>No has iniciado sesion!</h1>
      )
    }

    if (!auth) {
      return null
    }

    if (typeof window !== 'undefined') {
      return <Component {...props} />
    }
  }
}
