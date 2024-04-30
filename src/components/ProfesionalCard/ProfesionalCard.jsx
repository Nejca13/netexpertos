import Image from 'next/image'
import styles from './ProfesionalCard.module.css'

const ProfesionalCard = ({
  imgSrc,
  nombre,
  valoracion,
  experiencia,
  trabajosRealizados,
  profesion,
  recomendaciones,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerImage}>
        <Image
          className={styles.image}
          src={imgSrc}
          width={150}
          height={150}
          alt='foto del profesional'
        />
      </div>
      <div className={styles.containerInfo}>
        <p className={styles.pNombre}>{nombre}</p>
        <p className={styles.pProfesion}>{profesion}</p>
        <span className={styles.spanExperiencia}>
          Experiencia laboral - {experiencia}
        </span>
      </div>
      <ul className={styles.ulValoracion}>
        <li className={styles.li}>{valoracion}</li>
        <li className={styles.li}>{recomendaciones}</li>
        <li className={styles.li}>
          <button className={styles.buttonAgregarFavoritos}>
            Agregar a favoritos
          </button>
        </li>
      </ul>
      <button className={styles.buttonMasInfo}>
        Informacion detallada del profesional
      </button>
      <p className={styles.pTrabajosRealizados}>¡Trabajos realizados!</p>{' '}
      <ul className={styles.ulTrabajosRealizados}>
        {trabajosRealizados?.map((item, index) => (
          <li className={styles.li} key={index}>
            <Image
              className={styles.image}
              src={item.imagen.src}
              width={80}
              height={80}
              alt='fotos de trabajos realizados'
            />
            <p>{item.titulo}</p>
            <p>{item.lugar}</p>
            <p>{item.fecha}</p>
          </li>
        ))}
      </ul>
      <button className={styles.buttonContactar}>Contactar</button>
    </div>
  )
}

export default ProfesionalCard
