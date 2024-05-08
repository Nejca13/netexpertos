'use client'
import { useEffect, useState } from 'react'
import useGeolocation from '@/hooks/useGeolocation'
import MapComponent from '@/components/Map'
import styles from './page.module.css'
import Link from 'next/link'
import HambMenu from '@/components/ui/HambMenu/HambMenu'
import HambIcon from '@/components/ui/HambIcon/HambIcon'
import { useParams } from 'next/navigation'
import { getFilteredAndSortedProfessionalsByDistance } from '@/services/api/profesionales'
import isAuth from '@/components/Auth/IsAuth'
import SimpleLoader from '@/components/Loaders/SimpleLoader'
import ProfesionalCard from '@/components/ProfesionalCard/ProfesionalCard'
import { getUser } from '@/utils/indexedDataBase'
import ContainerBlanco from '@/components/Containers/ContainerFondoBlanco'

const Map = () => {
  const { profesion } = useParams()
  const { location, error } = useGeolocation()
  const [userApp, setUserApp] = useState({})
  const [coord, setCoord] = useState(null)
  const [show, setShow] = useState(false)
  const [professionalsNearby, setProfessionalsNearby] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isShowPopup, setIsShowPopup] = useState(false)

  const setUser = async () => {
    const storageUser = await getUser()
    setUserApp(storageUser.user_data)
  }

  useEffect(() => {
    setUser()
    if (location) {
      setCoord([location.latitude, location.longitude])
      setLoading(true) // Inicia el loader

      getFilteredAndSortedProfessionalsByDistance(
        {
          profesion: decodeURIComponent(profesion),
          latitud: location.latitude,
          longitud: location.longitude,
        },
        setErrorMsg
      )
        .then((res) => {
          setProfessionalsNearby(res)
          setLoading(false) // Detiene el loader cuando se recibe la respuesta
        })
        .catch((error) => {
          setErrorMsg('Hubo un error al cargar los profesionales cercanos.') // Manejo de error
          setLoading(false) // Detiene el loader en caso de error
        })
    }
  }, [location])
  return (
    <div id='map'>
      {show && <HambMenu userApp={userApp} show={() => setShow(!show)} />}

      <div className={styles.menu}>
        <HambIcon show={() => setShow(!show)} />
      </div>

      {isShowPopup.status === true && (
        <ProfesionalCard
          profesional={isShowPopup.profesional}
          setIsShowPopup={setIsShowPopup}
        />
      )}
      {loading ? ( // Si está cargando, muestra el loader
        <ContainerBlanco>
          <h3
            style={{
              alignContent: 'center',
              margin: 'auto',
              fontFamily: 'var(--font-roboto-bold)',
              textAlign: 'center',
            }}
          >
            <SimpleLoader />
          </h3>
        </ContainerBlanco>
      ) : errorMsg ? ( // Si hay un error, muestra el mensaje de error
        <ContainerBlanco>
          <h3
            style={{
              alignContent: 'center',
              margin: 'auto',
              fontFamily: 'var(--font-roboto-bold)',
              textAlign: 'center',
            }}
          >
            {errorMsg}
          </h3>
        </ContainerBlanco>
      ) : professionalsNearby.profesionales_cercanos.length > 0 ? ( // Si hay datos, muestra el mapa
        <MapComponent
          coord={coord}
          destacados={professionalsNearby.profesionales_cercanos}
          setIsShowPopup={setIsShowPopup}
        />
      ) : (
        <h1>{errorMsg}</h1>
      )}

      <Link href={'/profile'} className={styles.button}>
        Buscar
      </Link>
    </div>
  )
}

export default isAuth(Map)
