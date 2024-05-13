import Link from 'next/link'
import styles from './RubrosDropdown.module.css'
import { useState } from 'react'

const RubrosDropdown = ({ item, index, _id }) => {
  const rubro = Object.keys(item)[0]
  const profesion = Object.values(item)[0]
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      key={index}
      className={[isOpen ? styles.containerOpen : styles.container]}
    >
      <button
        className={[isOpen ? styles.buttonOpen : styles.button]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {rubro}
      </button>
      {isOpen && (
        <ul className={styles.profesionUl}>
          {profesion.map((profesion, index) => (
            <Link
              key={index}
              className={styles.link}
              href={`/profile/${_id}/mapaBuscador/${rubro}`}
            >
              <li className={styles.li}>
                <p className={styles.p}>{profesion}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RubrosDropdown
