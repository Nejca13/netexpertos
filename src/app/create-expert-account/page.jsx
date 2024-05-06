'use client'
import NavBar from '@/components/Navbar/NavBar'
import Container from '@/components/Containers/Container'
import { useState } from 'react'
import SeccionDatosPersonales from '@/components/FormComponents/SeccionDatosPersonales'
import SeccionDatosEmpresa from '@/components/FormComponents/SeccionDatosEmpresa'
import SeccionPerfil from '@/components/FormComponents/SeccionPerfil'
import ModalForm from '@/components/ui/Modals/ModalForm/ModalForm'
import SeccionDatosFreelance from '@/components/FormComponents/SeccionDatosFreelance'
import SeccionTrabajos from '@/components/FormComponents/SeccionTrabajos'
import separarDatos from '@/utils/separarDatosForm'
import TerminosYCondiciones from '@/components/TerminosYCondiciones/TerminosYCondiciones'
import { createProfesional } from '@/services/api/profesionales'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [formSection, setFormSection] = useState(0)
  const [formDataValues, setFormDataValues] = useState({})
  const [accountType, setAccountType] = useState(null)

  const router = useRouter()

  const handleSubmit = async (e) => {
    const formData = Object.fromEntries(new FormData(e))
    // Verificar si foto_perfil es un objeto File
    const jobs = await separarDatos(formData)
    if (jobs.foto_perfil instanceof File) {
      const reader = new FileReader()
      reader.onload = () => {
        // Al cargar el archivo, se convierte a base64 y se reemplaza en el objeto formData
        jobs.foto_perfil = reader.result

        // Ahora formData contiene la imagen de perfil convertida a base64
        setFormDataValues({ ...formDataValues, ...jobs })
      }
      reader.readAsDataURL(jobs.foto_perfil) // Convertir el archivo a base64
    }

    setFormDataValues({ ...formDataValues, ...jobs })
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
      {(() => {
        switch (formSection) {
          case 0:
            return <SeccionDatosPersonales onNext={handleNext} />
          case 1:
            return (
              <ModalForm
                setAccountType={setAccountType}
                setFormSection={setFormSection}
                formSection={formSection}
              />
            )
          case 2:
            if (accountType === 'empresa') {
              return (
                <SeccionDatosEmpresa onNext={handleNext} onBack={handleBack} />
              )
            }
            if (accountType === 'freelance') {
              return (
                <SeccionDatosFreelance
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )
            }
          case 3:
            return <SeccionPerfil onNext={handleNext} onBack={handleBack} />
          case 4:
            return <SeccionTrabajos onNext={handleNext} onBack={handleBack} />
          case 5:
            return (
              <TerminosYCondiciones
                onClick={() =>
                  createProfesional(formDataValues).then((res) => {
                    res === true && router.push('/login')
                  })
                }
              />
            )
          default:
            return null
        }
      })()}
    </Container>
  )
}

export default Page
