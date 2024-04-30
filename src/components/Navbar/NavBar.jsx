import Link from 'next/link'
import styles from './NavBar.module.css'
import Image from 'next/image'
import FlechaAtras from '../../assets/images/FlechaAtras.png'

const NavBar = ({ title }) => {
  return (
    <nav className={styles.nav}>
      <Link href={'/'}>
        <Image
          className={styles.image}
          src={FlechaAtras}
          height={'auto'}
          width={'auto'}
          priority={true}
          alt='Flecha volver atras'
        />
      </Link>
      <p className={styles.p}>{title}</p>
    </nav>
  )
}

export default NavBar
