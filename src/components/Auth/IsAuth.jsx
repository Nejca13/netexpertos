'use client'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

export default function isAuth(Component) {
  return function IsAuth(props) {
    const [auth, setAuth] = useState(null)

    useEffect(() => {
      const authValue = sessionStorage.getItem('user')
      setAuth(authValue)
    }, [])

    useEffect(() => {
      if (auth === null) {
        // Si auth aún no se ha establecido, no hagas nada
        return
      }

      if (!auth) {
        redirect('/')
      }
    }, [auth])

    if (auth === null) {
      // Si auth aún no se ha establecido, muestra un estado de carga o algo similar
      return <h1>Debes iniciar sesion para usar esta pagina!</h1>
    }

    if (!auth) {
      return null
    }

    if (typeof window !== 'undefined') {
      return <Component {...props} />
    }
  }
}
