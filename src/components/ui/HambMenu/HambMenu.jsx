import Image from 'next/image'
import styles from './HambMenu.module.css'
import { hambMenuOptions } from '@/constants/hambMenu'
import cross from '@/assets/images/cross.png'
import defaultImage from '@/assets/images/userImage.png'
import { userLogout } from '@/services/api/authUsuarios'

const HambMenu = ({ show, userApp }) => {
  return (
    <div className={styles.container}>
      <div className={styles.personalMenu}>
        <button onClick={show} className={styles.button}>
          <Image src={cross} width={40} height={40} alt='Icono de cerrar' />
        </button>
        <div className={styles.div}>
          <Image
            className={styles.image}
            src={userApp.foto_base64 ? userApp.foto_base64 : defaultImage.src}
            width={60}
            height={60}
            alt='Imagen de perfil del usuario'
          />
          <div className={styles.divText}>
            <p className={styles.name}>¡Hola, {userApp.nombre}!</p>
            <p className={styles.email}>{userApp.correo}</p>
          </div>
        </div>
      </div>
      <div className={styles.menuConfig}>
        <ul className={styles.ul}>
          {hambMenuOptions.map((item, index) => (
            <li className={styles.li} key={index}>
              <Image
                className={styles.icon}
                src={item.icon}
                width={24}
                height={24}
                alt={`Icono de ${item.name}`}
              />{' '}
              <span>{item.name}</span>
            </li>
          ))}
          <li className={styles.li}>
            <Image
              className={styles.icon}
              src={defaultImage}
              width={24}
              height={24}
              alt={`Icono de`}
            />{' '}
            <button className={styles.button} onClick={userLogout}>
              Salir
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HambMenu
