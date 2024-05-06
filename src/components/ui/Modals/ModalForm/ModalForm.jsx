import styles from './ModalForm.module.css'

const ModalForm = ({ setAccountType, setFormSection, formSection }) => {
  return (
    <div className={styles.modal}>
      <p className={styles.p}>Como se indetifica?</p>
      <div>
        <button
          onClick={() => {
            setAccountType('empresa')
            setFormSection(formSection + 1)
          }}
          className={styles.button}
        >
          EMPRESA
        </button>
        <button
          onClick={() => {
            setAccountType('freelance')
            setFormSection(formSection + 1)
          }}
          className={styles.button}
        >
          FREELANCE
        </button>
      </div>
    </div>
  )
}

export default ModalForm
