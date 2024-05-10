import Image from 'next/image'
import styles from './HambMenu.module.css'
import cross from '@/assets/images/cross.png'
import defaultImage from '@/assets/images/userImage.png'
import { userLogout } from '@/services/api/authUsuarios'
import {
  hambMenuOptionsClient,
  hambMenuOptionsExpert,
} from '@/constants/hambMenu'
import MenuPerfil from './Perfil/MenuPerfil'
import { useState } from 'react'

const HambMenu = ({ show, userApp }) => {
  const [menuComponent, setMenuComponent] = useState(null)
  const handleOptionClick = (name) => {
    switch (name) {
      case 'Perfil':
        console.log(name)
        setMenuComponent(
          <MenuPerfil setMenuComponent={setMenuComponent} user={userApp} />
        )

        break
      case 'Configuracion':
        console.log(name)
      default:
        break
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.personalMenu}>
        <button onClick={show} className={styles.button}>
          <Image src={cross} width={40} height={40} alt='Icono de cerrar' />
        </button>
        <div className={styles.div}>
          <Image
            className={styles.image}
            src={
              userApp
                ? userApp.foto_base64 || userApp.foto_perfil
                : defaultImage.src
            }
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
          {userApp.rol === 'Profesional'
            ? hambMenuOptionsExpert.map((item, index) => (
                <li
                  className={styles.li}
                  key={index}
                  onClick={() => handleOptionClick(item.name)}
                >
                  <Image
                    className={styles.icon}
                    src={item.icon}
                    width={24}
                    height={24}
                    alt={`Icono de ${item.name}`}
                  />{' '}
                  <span>{item.name}</span>
                </li>
              ))
            : hambMenuOptionsClient.map((item, index) => (
                <li
                  className={styles.li}
                  key={index}
                  onClick={() => handleOptionClick(item.name)}
                >
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
            />
            <button className={styles.button} onClick={userLogout}>
              Salir
            </button>
          </li>
        </ul>
      </div>
      {menuComponent}
    </div>
  )
}

export default HambMenu
