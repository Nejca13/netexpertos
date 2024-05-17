'use client'

import ContainerBlanco from '@/components/Containers/ContainerFondoBlanco'
import Image from 'next/image'
import LogoNetExpertos from '@/components/ui/Logo/LogoNetExpertos'
import styles from './page.module.css'
import lupa from '@/assets/images/LUPA.svg'
import { destacados } from '@/constants/destacados'
import HambMenu from '@/components/ui/HambMenu/HambMenu'
import { useEffect, useState } from 'react'
import HambIcon from '@/components/ui/HambIcon/HambIcon'
import isAuth from '@/components/Auth/IsAuth'
import { getUser } from '@/utils/indexedDataBase'
import RubrosDropdown from '@/components/RubrosDropdown/RubrosDropdown'
import { useParams } from 'next/navigation'
import { searchFunction } from './searchFunction'
import InfiniteLooper from '@/components/InfinityLooper/InfinityLooper'
import { usuariosPremium } from '@/constants/usuariosPremium'
import Destacados from '@/components/Map/Destacados/Destacados'

const Page = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [userApp, setUserApp] = useState({})
  const [searchItems, setSearchItems] = useState('')
  const { _id } = useParams()

  useEffect(() => {
    const asd = async () => {
      const user = await getUser(_id)
      setUserApp(user.user_data)
    }
    asd()
  }, [])

  return (
    <ContainerBlanco>
      {showMenu && (
        <HambMenu userApp={userApp} show={() => setShowMenu(!showMenu)} />
      )}

      <div className={styles.divNavBar}>
        <LogoNetExpertos width={200} height={70} />
        <HambIcon
          show={() => {
            setShowMenu(!showMenu)
          }}
        />
      </div>
      <div className={styles.divBuscador}>
        <div className={styles.logoLupa}>
          <Image
            className={styles.lupa}
            src={lupa}
            width={20}
            height={20}
            alt='Lupa Buscador'
          />
        </div>
        <input
          className={styles.searchInput}
          type='search'
          onChange={(e) =>
            setTimeout(() => {
              setSearchItems(e.target.value)
            }, 300)
          }
        />
      </div>
      <div className={styles.divCategorias}>
        {searchFunction(searchItems).map((item, index) => (
          <RubrosDropdown item={item} index={index} key={index} _id={_id} />
        ))}
      </div>
      <div className={styles.destacados}>
        <Destacados />
      </div>
    </ContainerBlanco>
  )
}

export default isAuth(Page)
