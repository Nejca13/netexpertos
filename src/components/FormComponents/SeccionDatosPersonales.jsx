import FormContainer from '../Containers/FormContainer'
import { Inputs } from './FormComponents'
import ButtonSubmit from '../Buttons/ButtonSubmit/ButtonSubmit'

const SeccionDatosPersonales = ({ onNext }) => {
  return (
    <FormContainer onSubmit={(e) => onNext(e)}>
      <Inputs
        type={'text'}
        name={'nombre'}
        placeholder={'Nombre'}
        text={'Nombre'}
        id={'nombre'}
        errorMessage={'El nombre ingresado tiene un formato no valido.'}
      />
      <Inputs
        id={'apellido'}
        placeholder={'Apellido'}
        name={'apellido'}
        type={'text'}
        text={'Apellido'}
        errorMessage={'El apellido ingresado tiene un formato no valido.'}
      />
      <Inputs
        type={'date'}
        text={'Fecha de nacimiento'}
        id={'nacimiento'}
        name={'nacimiento'}
        placeholder={'dd/mm/aa'}
        errorMessage={'Fecha incorrecta'}
      />
      <Inputs
        id={'telefono'}
        name={'numero'}
        type={'tel'}
        placeholder={'2984 565522'}
        text={'Numero de telefono'}
        errorMessage={'Debe ingresar un numero de telefono valido.'}
        minLength={'10'}
      />
      <ButtonSubmit text={'SIGUIENTE'} />
    </FormContainer>
  )
}

export default SeccionDatosPersonales
