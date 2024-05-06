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
  const [profilePhoto, setProfilePhoto] = useState('')

  const handleSubmit = (e) => {
    const formData = new FormData(e.target)
    formData.append('foto_base64', profilePhoto)
    const formDataValues = Object.fromEntries(formData)
    formDataValues.edad = parseInt(formDataValues.edad)
    formDataValues.nombre = formDataValues.nombre_apellido.split(' ')[0]
    formDataValues.apellido = formDataValues.nombre_apellido.split(' ')[0]
    console.log(formDataValues)
    createUser(formDataValues)
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    saveCompressedImageToLocalStorage(file, (compressedImage) => {
      setUserImage(compressedImage)
      setProfilePhoto(compressedImage)
    })
  }
  return (
    <Container>
      <NavBar title={'Crear cuenta de usuario'} />
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault()
          const data = Object.fromEntries(new FormData(e.target))
          if (data.password === data.password2) {
            handleSubmit(e)
          } else {
            alert('Las contraseñas deben ser identicas')
          }
        }}
        method={'POST'}
      >
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
          handleFileChange={handleFileChange}
          name={'foto_perfil'}
          id={'foto_perfil'}
          text={'Foto de perfil'}
        />
        <Inputs
          type={'text'}
          name={'nombre_apellido'}
          placeholder={'Nombre y apellido'}
          text={'Nombre y apellido'}
          id={'nombre_apellido'}
          errorMessage={'El nombre ingresado tiene un formato no valido.'}
        />
        <Inputs
          id={'correo'}
          placeholder={'Email'}
          name={'correo'}
          type={'email'}
          text={'Email'}
          errorMessage={'Ingrese un correo valido. EJ: nombre@email.com'}
        />
        <Inputs
          id={'password'}
          name={'password'}
          type={'password'}
          text={'Contraseña'}
          errorMessage={
            'Fomato de contraseña incorrectaLa contraseña debe tener al menos 8 caracteres e incluir al menos una letra minúscula, una letra mayúscula, un número y un símbolo especial.'
          }
        />
        <Inputs
          id={'password2'}
          name={'password2'}
          type={'password'}
          text={'Vuelva a repetir la contraseña'}
          errorMessage={
            'Fomato de contraseña incorrectaLa contraseña debe tener al menos 8 caracteres e incluir al menos una letra minúscula, una letra mayúscula, un número y un símbolo especial.'
          }
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
          <li className={styles.li}>Un simbolo</li>
        </ul>
        <ButtonSubmit text={'CREAR CUENTA'} />
      </FormContainer>
    </Container>
  )
}

export default Page
