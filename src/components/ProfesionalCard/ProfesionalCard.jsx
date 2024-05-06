import Image from 'next/image'
import styles from './ProfesionalCard.module.css'

const ProfesionalCard = ({ profesional }) => {
  const {
    calificacion,
    acerca_de_mi,
    apellido,
    correo,
    experiencia_laboral_años,
    nombre,
    fotos_trabajos,
    rubro_nombre,
    profesion_nombre,
    nacimiento,
    numero,
    foto_perfil,
    horarios_de_atencion,
    recomendaciones,
  } = profesional
  return (
    <div className={styles.container}>
      <div className={styles.containerImage}>
        <Image
          className={styles.image}
          src={foto_perfil}
          width={150}
          height={150}
          alt='foto del profesional'
        />
      </div>
      <div className={styles.containerInfo}>
        <p className={styles.pNombre}>{nombre}</p>
        <p className={styles.pProfesion}>{profesion_nombre}</p>
        <span className={styles.spanExperiencia}>
          Experiencia laboral - {experiencia_laboral_años} años
        </span>
      </div>
      <ul className={styles.ulValoracion}>
        <li className={styles.li}>{calificacion}</li>
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
        {fotos_trabajos?.map((item, index) => (
          <li className={styles.li} key={index}>
            <Image
              className={styles.image}
              src={item.imagen_base64}
              width={70}
              height={70}
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
