import { updateUser } from '@/utils/indexedDataBase'

const API_URL = 'https://vps-4057595-x.dattaweb.com/profesionales/'

// Función para obtener todos los profesionales
export const getAllProfesionales = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Función para crear un nuevo profesional
export const createProfesional = async (data) => {
  const [nombre, apellido] = data?.nombre_apellido?.split(' ')
  const newData = {
    rol: 'Profesional',
    nombre: nombre, // Puedes asignar el nombre y apellido según sea necesario
    apellido: apellido,
    numero: data.telefono,
    correo: data.correo,
    password: data.password,
    ubicacion: data.ubicacion,
    calificacion: 0,
    experiencia_laboral_años: data.experiencia_laboral_años
      ? parseInt(data.experiencia_laboral_años)
      : 0,
    recomendaciones: 0,
    fotos_trabajos: data.fotos_trabajos,
    foto_perfil: data.foto_perfil,
    horarios_atencion: `de ${data.horario_apertura} - a ${data.horario_cierre}`,
    nacimiento: data.nacimiento,
    rubro_nombre: data.rubro_nombre,
    profesion_nombre: data.profesion_nombre,
    acerca_de_mi: data.acerca_de_mi,
    fecha_registro: new Date().toISOString(), // Obtener la fecha actual en formato ISO
  }
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    }
    const response = await fetch(API_URL, options)

    if (response.ok) {
      console.log('Usuario creado exitosamente')
      return true
    } else {
      const errorData = await response.json() // Captura el cuerpo de la respuesta si hay error
      console.log(errorData)
      console.error(
        `Error en la solicitud: `,
        errorData // Imprime también los detalles del error si están disponibles
      )
    }
  } catch (error) {
    console.error('Error creando usuario:', error)
  }
}

// Funcion para obtener profesionales filtrados por profesion y ordenados desde el mas cerca al mas lejos

export const getFilteredAndSortedProfessionalsByDistance = async (
  data,
  setErrorMessage
) => {
  const kilometros = {
    18: 5,
    17: 10,
    16: 20,
    15: 35,
    14: 55,
    13: 80,
    12: 120,
    11: 180,
    10: 250,
    9: 350,
    8: 500,
    7: 650,
    6: 800,
    5: 1000,
    4: 1000,
    3: 1000,
    2: 1000,
    1: 1000,
  }
  try {
    const response = await fetch(
      API_URL +
        `cercanos/${data.profesion}?latitud=${data.latitud}&longitud=${
          data.longitud
        }&rango_km=${kilometros[data.kilometrosDeRadio]}&page=1&page_size=10`
    )
    if (!response.ok) {
      const error = await response.json()
      console.log(error)
      throw new Error('Error en la solicitud')
    }
    const result = await response.json()

    if (result.profesionales_cercanos.length === 0) {
      setErrorMessage(`No hay ${decodeURIComponent(data.profesion)} cerca`)
    } else {
      setErrorMessage(false)
    }
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateProfessional = async (user, updatedData) => {
  console.log(updatedData)
  try {
    const mailEncode = encodeURIComponent(user.correo.trim())
    console.log(user.correo)
    const response = await fetch(API_URL + `?correo=${mailEncode}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })

    if (response.ok) {
      // La solicitud fue exitosa
      const responseData = await response.json()
      console.log(responseData.message)
      await updateUser(updatedData, user._id)
      window.location.reload()
      return responseData // Puedes retornar los datos actualizados si lo deseas
    } else {
      // La solicitud no fue exitosa
      const errorMessage = await response.text()
      throw new Error(`Error al actualizar los datos: ${errorMessage}`)
    }
  } catch (error) {
    // Error de red o cualquier otro error
    console.error('Ocurrió un error al realizar la solicitud:', error.message)
    throw error // Puedes lanzar el error nuevamente para que quien llame a esta función pueda manejarlo si es necesario
  }
}
