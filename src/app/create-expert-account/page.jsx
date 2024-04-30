'use client'
import NavBar from '@/components/Navbar/NavBar'
import Container from '@/components/Containers/Container'
import { useState } from 'react'
import SeccionDatosPersonales from '@/components/FormComponents/SeccionDatosPersonales'
import SeccionDatosProfesionales from '@/components/FormComponents/SeccionDatosProfesionales'
import SeccionFinal from '@/components/FormComponents/SeccionFinal'
import InformacionDelUsuario from '@/components/Lists/InformacionDelUsuario'

const Page = () => {
  const [formSection, setFormSection] = useState(0)
  const [formDataValues, setFormDataValues] = useState({})

  const handleSubmit = (values) => {
    const newData = Object.fromEntries(new FormData(values))
    setFormDataValues({ ...formDataValues, ...newData })
    console.log(formDataValues)
  }

  const handleNext = (e) => {
    e.preventDefault()
    handleSubmit(e.target)
    setFormSection(formSection + 1)
  }
  const handleBack = (e) => {
    e.preventDefault()
    setFormSection(formSection - 1)
  }

  return (
    <Container>
      <NavBar title={'Crear cuenta de Experto'} />
      {formSection === 0 && <SeccionDatosPersonales onNext={handleNext} />}
      {formSection === 1 && (
        <SeccionDatosProfesionales onNext={handleNext} onBack={handleBack} />
      )}

      {formSection === 2 && (
        <SeccionFinal onNext={handleNext} onBack={handleBack} />
      )}
      {formSection === 3 && <InformacionDelUsuario data={formDataValues} />}
    </Container>
  )
}

export default Page
