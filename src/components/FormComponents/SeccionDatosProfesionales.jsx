import FormContainer from '../Containers/FormContainer'
import { Inputs, Select, TextArea } from './FormComponents'
import rubros from '@/constants/rubros'
import profesionesPorRubro from '@/constants/profesionesPorRubro'
import { useEffect, useState } from 'react'
import Button from '../Buttons/Button/Button'
import ButtonSubmit from '../Buttons/ButtonSubmit/ButtonSubmit'
import { horariosDeAtencion } from '@/constants/horariosDeAtencion'

const SeccionDatosProfesionales = ({ onNext, onBack }) => {
  const [rubroSeleccionado, setRubroSeleccionado] = useState('')

  useEffect(() => {
    setRubroSeleccionado(rubros[0])
  }, [])

  return (
    <FormContainer onSubmit={(e) => onNext(e)}>
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
        data={horariosDeAtencion}
        id={'horarios_atencion'}
        name={'horarios_atencion'}
        text={'Horarios de atención'}
      />
      <Inputs
        text={'Correo electronico de la empresa'}
        name={'correo'}
        id={'correo'}
        placeholder={'correo@empresa.com'}
        type={'email'}
        errorMessage={'Ingrese un correo valido. EJ: nombre@email.com'}
      />
      <TextArea
        text={'Descripción'}
        id={'acerca_de_mi'}
        name={'acerca_de_mi'}
        placeholder={
          'Escribe una descripcion sobre tu profesion y habilidades.'
        }
      />
      <div style={{ display: 'flex', gap: '30px', width: '100%' }}>
        <ButtonSubmit text={'SIGUIENTE'} />
        <Button func={onBack} text={'VOLVER'} />
      </div>
    </FormContainer>
  )
}

export default SeccionDatosProfesionales
