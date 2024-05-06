import styles from './SeccionTrabajos.module.css'
import FormContainer from '../Containers/FormContainer'
import Image from 'next/image'
import ButtonSubmit from '../Buttons/ButtonSubmit/ButtonSubmit'
import { useState } from 'react'
import MultiImageForm from '../MultiImageForm/MultiImageForm'
import ImagenPlus from '@/assets/images/SignoMas.png'

const SeccionTrabajos = ({ onNext, onBack }) => {
  const [arr, setArr] = useState([1])

  return (
    <FormContainer
      onSubmit={(e) => {
        e.preventDefault()
        onNext(e)
      }}
    >
      <h2 style={{ textAlign: 'center' }}>
        Carga fotos de tus ultimos trabajos
      </h2>
      <div className={styles.carrusel}>
        {arr.length > 0 &&
          arr.map((item, index) => (
            <MultiImageForm index={index} key={index} />
          ))}
      </div>
      <button
        className={styles.buttonMore}
        onClick={(e) => {
          e.preventDefault()
          setArr([...arr, 1])
        }}
      >
        <Image src={ImagenPlus} width={25} height={25} alt='signo mas' />
        <span>Carga mas imagenes!</span>
      </button>
      <div style={{ display: 'flex', gap: '30px', width: '100%' }}>
        {/* <ButtonSubmit text={'SIGUIENTE'} />
        <Button func={onBack} text={'VOLVER'} /> */}
        <ButtonSubmit text={'SIGUIENTE'} />
      </div>
    </FormContainer>
  )
}

export default SeccionTrabajos
