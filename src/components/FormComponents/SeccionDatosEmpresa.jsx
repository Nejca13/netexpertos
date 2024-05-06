import FormContainer from '../Containers/FormContainer'
import { InputTypeFile, Inputs, Select, TextArea } from './FormComponents'
import rubros from '@/constants/rubros'
import profesionesPorRubro from '@/constants/profesionesPorRubro'
import { useEffect, useState } from 'react'
import Button from '../Buttons/Button/Button'
import ButtonSubmit from '../Buttons/ButtonSubmit/ButtonSubmit'
import styles from './SeccionDatosEmpresa.module.css'
import defaultUserImage from '../../assets/images/userImage.png'
import Image from 'next/image'
import { saveCompressedImageToLocalStorage } from '@/utils/minificadorDeImagenes'

const SeccionDatosEmpresa = ({ onNext, onBack }) => {
  const [rubroSeleccionado, setRubroSeleccionado] = useState('')
  const [userImage, setUserImage] = useState(defaultUserImage)

  useEffect(() => {
    setRubroSeleccionado(rubros[0])
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    saveCompressedImageToLocalStorage(file, (compressedImage) => {
      setUserImage(compressedImage)
    })
  }

  return (
    <FormContainer onSubmit={(e) => onNext(e)}>
      <Image
        className={styles.imageUser}
        src={userImage}
        width={80}
        height={80}
        alt='Foto de perfil del usuario'
      />
      <InputTypeFile
        handleFileChange={handleFileChange}
        text={'Logo de la empresa'}
        name={'foto_perfil'}
        id={'foto_perfil'}
      />
      <Inputs
        text={'Nombre de la empresa'}
        name={'empresa_nombre'}
        id={'empresa_nombre'}
        type={'text'}
        placeholder={'Security and System'}
      />
      <Inputs
        id={'experiencia'}
        name={'experiencia_laboral_años'}
        placeholder={0}
        value={0}
        type={'number'}
        text={'Experiencia Laboral'}
        errorMessage={'Debe ingresar los años de experiencia laboral. EJ: 1'}
      />
      <Select
        data={rubros}
        id={'rubro'}
        name={'rubro_nombre'}
        text={'Selecciona tu rubro'}
        func={(e) => setRubroSeleccionado(e.target.value)}
      />
      {rubroSeleccionado && (
        <Select
          data={profesionesPorRubro[rubroSeleccionado]}
          id={'profesion'}
          name={'profesion_nombre'}
          text={'Selecciona tu profesión'}
        />
      )}

      <div style={{ display: 'flex', gap: '30px', width: '100%' }}>
        <ButtonSubmit text={'SIGUIENTE'} />
        <Button func={onBack} text={'VOLVER'} />
      </div>
    </FormContainer>
  )
}

export default SeccionDatosEmpresa
