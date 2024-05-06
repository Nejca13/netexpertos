import styles from './Button.module.css'

const Button = ({ text, func, disabled }) => {
  return (
    <button
      className={styles.button}
      onClick={func}
      disabled={disabled ? disabled : false}
    >
      {text}
    </button>
  )
}

export default Button
