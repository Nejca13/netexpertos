'use client'
import styles from './page.module.css'
import {
  InputTypeFile,
  Inputs,
} from '@/components/FormComponents/FormComponents'
import NavBar from '@/components/Navbar/NavBar'
import ButtonSubmit from '@/components/Buttons/ButtonSubmit/ButtonSubmit'
import Container from '@/components/Containers/Container'
import FormContainer from '@/components/Containers/FormContainer'
import useGeolocation from '@/hooks/useGeolocation'
import SimpleLoader from '@/components/Loaders/SimpleLoader'
import checkIcon from '../../assets/images/checkIcon.svg'
import Image from 'next/image'
import { useState } from 'react'
import defaultUserImage from '../../assets/images/userImage.png'
import { createUser } from '@/services/api/clientes'
import { saveCompressedImageToLocalStorage } from '@/utils/minificadorDeImagenes'

const Page = () => {
  const { location, error } = useGeolocation()
  const [userImage, setUserImage] = useState(defaultUserImage)
  const handleSubmit = (e) => {
    e.preventDefault()
    const formDataValues = Object.fromEntries(new FormData(e.target))
    formDataValues.edad = parseInt(formDataValues.edad)
    createUser(formDataValues)
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    saveCompressedImageToLocalStorage(file)
    if (file) {
      const imageURL = URL.createObjectURL(file)
      setUserImage(imageURL)
    }
  }
  return (
    <Container>
      <NavBar title={'Crear cuenta de usuario'} />
      <FormContainer onSubmit={(e) => handleSubmit(e)} method={'POST'}>
        <Image
          className={styles.userImage}
          src={userImage}
          width={100}
          height={100}
          style={{ borderRadius: '100%' }}
          alt='Foto de perfil del usuario'
        />
        <InputTypeFile
          className={styles.inputFile}
          type='file'
          handleFileChange={handleFileChange}
          name='profilePhoto'
          id='profilePhoto'
        />
        <Inputs
          type={'text'}
          name={'nombre'}
          placeholder={'Nombre'}
          text={'Nombre'}
          id={'nombre'}
        />
        <Inputs
          type={'text'}
          name={'apellido'}
          placeholder={'Apellido'}
          text={'Apellido'}
          id={'apellido'}
        />
        <Inputs
          type={'number'}
          name={'edad'}
          placeholder={'Edad'}
          text={'Edad'}
          id={'edad'}
        />
        <Inputs
          id={'correo'}
          placeholder={'Email'}
          name={'correo'}
          type={'email'}
          text={'Email'}
        />
        <Inputs
          type={'date'}
          text={'Fecha de nacimiento'}
          id={'birthdate'}
          name={'birthdate'}
          placeholder={'dd/mm/aa'}
        />
        <Inputs
          id={'phone'}
          name={'phone'}
          type={'tel'}
          placeholder={'2994595681'}
          text={'Numero de telefono'}
        />
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
          value={
            location && {
              latitud: location.latitude,
              longitude: location.longitude,
            }
          }
        />
        <span className={styles.ubicacionSpan}>
          Ubicación:{' '}
          {location ? (
            <Image
              src={checkIcon}
              width={25}
              height={25}
              alt='Icono de check'
            />
          ) : (
            <SimpleLoader />
          )}
        </span>
        <ul className={styles.ul}>
          <li className={styles.li}>8 Caracteres</li>
          <li className={styles.li}>Una minúscula</li>
          <li className={styles.li}>Una mayúscula</li>
          <li className={styles.li}>Un número</li>
        </ul>
        <p className={styles.p}>
          Al crear una cuenta, aceptas nuestras políticas de privacidad
        </p>
        <ButtonSubmit text={'CREAR CUENTA'} />
      </FormContainer>
    </Container>
  )
}

export default Page
