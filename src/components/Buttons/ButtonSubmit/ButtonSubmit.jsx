'use client'
import styles from './Button.module.css'

const ButtonSubmit = ({ text }) => {
  return <input type='submit' value={text} className={styles.button} />
}

export default ButtonSubmit
