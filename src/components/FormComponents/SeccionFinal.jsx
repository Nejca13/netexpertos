import styles from './SeccionFinal.module.css'
import FormContainer from '../Containers/FormContainer'
import SimpleLoader from '../Loaders/SimpleLoader'
import Image from 'next/image'
import ButtonSubmit from '../Buttons/ButtonSubmit/ButtonSubmit'
import { InputTypeFile, Inputs } from './FormComponents'
import useGeolocation from '@/hooks/useGeolocation'
import checkIcon from '../../assets/images/checkIcon.svg'
import { useState } from 'react'
import defaultUserImage from '../../assets/images/userImage.png'

const SeccionFinal = ({ onNext }) => {
  const { location, error } = useGeolocation()
  const [userImage, setUserImage] = useState(defaultUserImage)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    saveCompressedImageToLocalStorage(file)
    if (file) {
      const imageURL = URL.createObjectURL(file)
      setUserImage(imageURL)
    }
  }

  return (
    <FormContainer
      onSubmit={(e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        if (data.password === data.password2) {
          onNext(e)
        } else {
          alert('Las contraseñas deben ser identicas')
        }
      }}
    >
      <Image
        className={styles.imageUser}
        src={userImage}
        width={100}
        height={100}
        alt='Foto de perfil del usuario'
      />
      <InputTypeFile handleFileChange={handleFileChange} />
      <Inputs
        id={'password'}
        name={'password'}
        type={'password'}
        text={'Contraseña'}
      />
      <Inputs
        id={'password2'}
        name={'password2'}
        type={'password'}
        text={'Vuelva a repetir la contraseña'}
      />
      <Inputs
        type={'hidden'}
        name={'ubicacion'}
        id={'ubicacion'}
        value={location && { lat: location.latitude, long: location.longitude }}
      />
      <span className={styles.ubicacionSpan}>
        Ubicación:{' '}
        {location ? (
          <Image src={checkIcon} width={25} height={25} alt='Icono de check' />
        ) : (
          <SimpleLoader />
        )}
      </span>
      <ul className={styles.ul}>
        <li className={styles.li}>8 Caracteres</li>
        <li className={styles.li}>Una minúscula</li>
        <li className={styles.li}>Una mayúscula</li>
        <li className={styles.li}>Un número</li>
        <li className={styles.li}>Un simbolo</li>
      </ul>
      <p className={styles.p}>
        Al crear una cuenta, aceptas nuestras políticas de privacidad
      </p>
      <ButtonSubmit text={'CREAR CUENTA'} />
    </FormContainer>
  )
}

export default SeccionFinal
