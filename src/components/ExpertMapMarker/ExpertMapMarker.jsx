import Image from 'next/image'
import styles from './ExpertMapMarker.module.css'

const ExpertMapMarker = ({ imgSrc, name, profesion, calificacion, status }) => {
  return (
    <div className={styles.pin1}>
      <div className={[status === true && styles.online]}></div>
      <div className={styles.rating}>
        <p>{calificacion}</p>
      </div>
      <Image
        className={styles.image}
        src={imgSrc}
        width={40}
        height={40}
        alt='imagen experto'
      />
    </div>
  )
}

export default ExpertMapMarker
