import Image from 'next/image'
import styles from './CardInfoPersonal.module.css'
import cross from '@/assets/images/cross-blanca.png'

const CardInfoPersonal = ({ setShowMoreInfo, profesional }) => {
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
    horarios_atencion,
    recomendaciones,
  } = profesional
  console.log(horarios_atencion)
  return (
    <section className={styles.backgroundCard}>
      <div className={styles.container}>
        <button
          className={styles.botonCerrar}
          onClick={() => setShowMoreInfo(false)}
        >
          <Image width={25} height={25} src={cross} alt='boton cerrar' />
        </button>
        <div className={styles.containerImage}>
          <Image
            className={styles.image}
            src={foto_perfil}
            width={100}
            height={100}
            alt='foto del profesional'
          />
        </div>
        <div className={styles.title}>
          <p className={styles.pTitle}>Información Personal</p>
        </div>
        <div className={styles.containerInfo}>
          <span className={styles.span}>Nombre</span>
          <p className={styles.p}>
            {nombre} {apellido}
          </p>
        </div>
        <div className={styles.edad_profesion}>
          <div className={styles.containerInfo}>
            <span className={styles.span}>Edad</span>
            <p className={styles.p}>{nacimiento}</p>
          </div>
          <div className={styles.containerInfo}>
            <span className={styles.span}>Profesión</span>
            <p className={styles.p}>{profesion_nombre}</p>
          </div>
        </div>
        <div className={styles.containerInfo}>
          <span className={styles.span}>Horarios</span>
          <p className={styles.p}>{horarios_atencion}</p>
        </div>
        <div className={styles.containerInfo}>
          <span className={styles.span}>Acerca de mi</span>
          <p className={styles.p}>{acerca_de_mi}</p>
        </div>
      </div>
    </section>
  )
}

export default CardInfoPersonal
