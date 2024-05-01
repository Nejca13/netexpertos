'use client'

import { useEffect, useState } from 'react'
import useGeolocation from '@/hooks/useGeolocation'
import profesionalesFiltrados from '@/constants/profesionalsNearby.json'
import MapComponent from '@/components/Map'
import styles from './page.module.css'
import Link from 'next/link'
import HambMenu from '@/components/ui/HambMenu/HambMenu'
import HambIcon from '@/components/ui/HambIcon/HambIcon'
import { useParams } from 'next/navigation'
import { getFilteredAndSortedProfessionalsByDistance } from '@/services/api/profesionales'
import isAuth from '@/components/Auth/IsAuth'

const Map = () => {
  const { profesion } = useParams()
  const { location, error } = useGeolocation()
  const [userApp, setUserApp] = useState({})
  const [coord, setCoord] = useState(null)
  const [show, setShow] = useState(false)
  const [professionalsNearby, setProfessionalsNearby] = useState([])

  useEffect(() => {
    const storageUser = window?.sessionStorage?.getItem('user')
    setUserApp(JSON.parse(storageUser))
    if (location) {
      setCoord([location.latitude, location.longitude])
      getFilteredAndSortedProfessionalsByDistance({
        profesion: decodeURIComponent(profesion),
        latitud: location.latitude,
        longitud: location.longitude,
      }).then((res) => setProfessionalsNearby(res))
    }
  }, [location])

  return (
    <div id='map'>
      {show && <HambMenu userApp={userApp} show={() => setShow(!show)} />}
      <div className={styles.menu}>
        <HambIcon show={() => setShow(!show)} />
      </div>
      {professionalsNearby.length > 0 && (
        <MapComponent coord={coord} destacados={professionalsNearby} />
      )}
      <Link href={'/profile'} className={styles.button}>
        Buscar
      </Link>
    </div>
  )
}

export default isAuth(Map)
