import styles from './Button.module.css'

const Button = ({ text, func }) => {
  return (
    <button className={styles.button} onClick={func}>
      {text}
    </button>
  )
}

export default Button
