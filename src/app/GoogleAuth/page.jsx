'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '../userContext'
import LogoNetExpertos from '@/components/ui/Logo/LogoNetExpertos'
import NavBar from '@/components/Navbar/NavBar'
import { useRouter } from 'next/navigation'
import useGeolocation from '@/hooks/useGeolocation'
import ModalLoading from '@/components/ui/Modals/ModalLoading/ModalLoading'
import Container from '@/components/Containers/Container'
import { addUser, clearUsers } from '@/utils/indexedDataBase'

const Page = () => {
  const [auth, setAuth] = useAuth()
  const [authComponent, setAuthComponent] = useState(null)
  const router = useRouter()
  const { location, error } = useGeolocation()

  const handleAuth = async (data) => {
    data.ubicacion = `${location.latitude}, ${location.longitude}`
    const response = await fetch(
      'https://vps-4057595-x.dattaweb.com/auth-google/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    if (response.ok) {
      const data = await response.json()
      const user = {
        token: 'asdasdaqwe123',
        user_data: data.user,
      }
      await addUser(user)
      setTimeout(() => {
        router.push(`/profile/${data.user._id}`)
      }, 1000)
    }

    setAuthComponent(<ModalLoading message={'Cargando infomacion...'} />)
  }
  useEffect(() => {
    clearUsers()
    if (location && auth) {
      handleAuth(auth)
    }
  }, [location])

  return (
    <Container justifyContent={'flex-start'}>
      <NavBar onClick={() => router.back()} />

      <LogoNetExpertos width={200} />

      {location ? (
        <ModalLoading message={'Comprobando informacion ...'} />
      ) : (
        <ModalLoading message={'Obteniendo ubicacion actual...'} />
      )}
    </Container>
  )
}

export default Page
