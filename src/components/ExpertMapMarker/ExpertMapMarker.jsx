import Image from 'next/image'
import styles from './ExpertMapMarker.module.css'

const ExpertMapMarker = ({ profesional }) => {
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
  } = profesional
  return (
    <div className={styles.pin1}>
      <div className={[status === true && styles.online]}></div>
      <div className={styles.rating}>
        <p>{calificacion}</p>
      </div>
      <Image
        className={styles.image}
        src={foto_perfil}
        width={40}
        height={40}
        alt='imagen experto'
      />
    </div>
  )
}

export default ExpertMapMarker
