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
import CardInfoPersonal from '@/components/CardInfoPersonal/CardInfoPersonal'
import Container from '@/components/Containers/Container'

const Map = () => {
  const { profesion, _id } = useParams()
  const { location, error } = useGeolocation()
  const [userApp, setUserApp] = useState({})
  const [coord, setCoord] = useState(null)
  const [show, setShow] = useState(false)
  const [professionalsNearby, setProfessionalsNearby] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isShowPopup, setIsShowPopup] = useState(false)
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [kilometrosDeRadio, setKilometrosDeRadio] = useState(15)

  const setUser = async () => {
    const storageUser = await getUser(_id)
    setUserApp(storageUser.user_data)
  }

  useEffect(() => {
    setUser()
    if (location) {
      setCoord([location.latitude, location.longitude])
      setLoading(true)
      getFilteredAndSortedProfessionalsByDistance(
        {
          profesion: profesion,
          latitud: location.latitude,
          longitud: location.longitude,
          kilometrosDeRadio: kilometrosDeRadio,
        },
        setErrorMsg
      )
        .then((res) => {
          setProfessionalsNearby(res)
          setLoading(false)
        })
        .catch((error) => {
          setErrorMsg('Hubo un error al cargar los profesionales cercanos.')
          setLoading(false)
        })
    }
  }, [location])
  useEffect(() => {
    if (location) {
      getFilteredAndSortedProfessionalsByDistance(
        {
          profesion: profesion,
          latitud: location.latitude,
          longitud: location.longitude,
          kilometrosDeRadio: kilometrosDeRadio,
        },
        setErrorMsg
      )
        .then((res) => {
          setProfessionalsNearby(res)
          setLoading(false)
        })
        .catch((error) => {
          setErrorMsg('Hubo un error al cargar los profesionales cercanos.')
          setLoading(false)
        })
    }
  }, [kilometrosDeRadio])

  const kilometros = {
    18: 5,
    17: 10,
    16: 20,
    15: 35,
    14: 55,
    13: 80,
    12: 120,
    11: 180,
    10: 250,
    9: 350,
    8: 500,
    7: 650,
    6: 800,
    5: 1000,
    4: 1000,
    3: 1000,
    2: 1000,
    1: 1000,
  }

  const renderMapComponent = () => {
    if (loading) {
      return (
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
      )
    } else {
      return (
        <>
          <MapComponent
            coord={coord}
            profesionales={professionalsNearby.profesionales_cercanos}
            setIsShowPopup={setIsShowPopup}
            setKilometrosDeRadio={setKilometrosDeRadio}
          />
          <>
            {errorMsg && (
              <div className={styles.errorMessage}>
                <SimpleLoader />
                <p className={styles.p}>
                  No se encontro ningun {decodeURIComponent(profesion)}
                  <p className={styles.e}>
                    Buscando en un radio de {kilometros[kilometrosDeRadio]} Km
                  </p>
                </p>
              </div>
            )}
          </>
        </>
      )
    }
  }

  return (
    <Container>
      <HambMenu userApp={userApp} show={show} setShowMenu={setShow} />
      <div className={styles.menu}>
        <HambIcon show={() => setShow(!show)} />
      </div>

      {isShowPopup.status === true &&
        (showMoreInfo ? (
          <CardInfoPersonal
            profesional={isShowPopup.profesional}
            setShowMoreInfo={setShowMoreInfo}
          />
        ) : (
          <ProfesionalCard
            profesional={isShowPopup.profesional}
            setIsShowPopup={setIsShowPopup}
            setShowMoreInfo={setShowMoreInfo}
          />
        ))}

      {renderMapComponent()}

      <Link href={`/profile/${_id}`} className={styles.button}>
        Buscar
      </Link>
    </Container>
  )
}

export default isAuth(Map)
