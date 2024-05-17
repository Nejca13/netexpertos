import Image from 'next/image'
import styles from './Destacados.module.css'
import { usuariosPremium } from '@/constants/usuariosPremium'
import { useState } from 'react'
import ProfesionalCard from '@/components/ProfesionalCard/ProfesionalCard'
import InfiniteLooper from '@/components/InfinityLooper/InfinityLooper'

const Destacados = () => {
  return (
    <div className={styles.destacados}>
      <p className={styles.title}>Destacados de la semana</p>
      <ul className={styles.destacadosUl}>
        <InfiniteLooper speed={60} direction='left'>
          {usuariosPremium.map((item, index) => (
            <li className={styles.destacadosLi} key={index}>
              <Image
                className={styles.image}
                src={item.foto_perfil}
                width={60}
                height={60}
                alt='Imagen de experto destacado'
                quality={50}
                placeholder='blur'
              />
              <p className={styles.pName}>{item.nombre}</p>
              <p className={styles.pDescripcion}>
                {item.rubro_nombre}{' '}
                <span className={styles.spanCalificacion}>
                  {item.calificacion}
                </span>{' '}
                X
              </p>
            </li>
          ))}
        </InfiniteLooper>
      </ul>
    </div>
  )
}

export default Destacados
